import { useCallback, useEffect, useRef, useState } from "react";
import { getBackendUrl, getAiAgentPublicKey } from "../lib/env";

const STORAGE_GUEST = "reparv_ai_guest_id";
const WELCOME_MESSAGE =
  "Namaste! Main aapka Reparv AI Advisor hoon. Properties, budget ya site visit — kuch bhi pooch sakte ho.";

function getApiBase() {
  return getBackendUrl();
}

function getOrCreateGuestId() {
  const stored = localStorage.getItem(STORAGE_GUEST);
  if (stored) return stored;

  const id = `guest:${crypto.randomUUID()}`;
  localStorage.setItem(STORAGE_GUEST, id);
  return id;
}

function buildPayload(message, user) {
  const payload = {
    type: "chat",
    message,
    language: "hinglish",
  };

  if (user?.id) {
    payload.mode = "user";
    payload.userId = String(user.id);
  } else {
    payload.guestId = getOrCreateGuestId();
    payload.mode = "guest";
  }

  return payload;
}

async function fetchConversationHistory() {
  const res = await fetch(`${getApiBase()}/user/agent/conversation-history`, {
    credentials: "include",
  });

  if (res.status === 401) return [];
  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data.messages) ? data.messages : [];
}

async function sendViaHttp(payload) {
  // Next.js env (NEXT_PUBLIC_AI_AGENT_PUBLIC_KEY); import.meta.env is a Vite-only API
  const apiKey = getAiAgentPublicKey();
  const res = await fetch(`${getApiBase()}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      ...payload,
      ...(apiKey ? { apiKey } : {}),
    }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server returned an invalid response.");
  }

  if (!res.ok) {
    throw new Error(data.message || "Failed to reach AI advisor.");
  }

  return data;
}

/**
 * Streamed chat (Server-Sent Events). Calls onEvent for each server event:
 * status | properties | delta | reset | done | error.
 * Throws only if the stream could not start (caller then falls back to HTTP).
 */
async function sendViaStream(payload, onEvent) {
  const apiKey = getAiAgentPublicKey();
  const res = await fetch(`${getApiBase()}/api/ai/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
    credentials: "include",
    body: JSON.stringify({ ...payload, ...(apiKey ? { apiKey } : {}) }),
  });
  if (!res.ok || !res.body) {
    const data = await res.json().catch(() => ({}));
    const err = new Error(data.message || `Stream unavailable (${res.status})`);
    err.status = res.status;
    throw err;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let boundary;
    while ((boundary = buffer.indexOf("\n\n")) !== -1) {
      const chunk = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      const line = chunk.split("\n").find((l) => l.startsWith("data:"));
      if (!line) continue;
      try {
        onEvent(JSON.parse(line.slice(5).trim()));
      } catch {
        // ignore a malformed event
      }
    }
  }
}

export function useAgentChat(user, enabled) {
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  const busyRef = useRef(false);
  const userRef = useRef(user);
  const initRef = useRef(false);

  userRef.current = user;

  const addMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), ...msg }]);
  }, []);

  const handleReply = useCallback(
    (data) => {
      if (data.type === "error") {
        setIsSending(false);
        setIsTyping(false);
        busyRef.current = false;
        addMessage({
          role: "error",
          text: data.message || "Something went wrong",
        });
        return;
      }

      if (data.type === "reply") {
        setIsSending(false);
        setIsTyping(false);
        busyRef.current = false;
        setConnectionStatus("connected");

        if (data.session?.guestId) {
          localStorage.setItem(STORAGE_GUEST, data.session.guestId);
        }

        addMessage({
          role: "bot",
          text: data.reply || "I couldn't find an answer. Please try again.",
          properties: data.properties,
        });
      }
    },
    [addMessage],
  );

  const updateMessage = useCallback((id, patch) => {
    setMessages((prev) => {
      const exists = prev.some((m) => m.id === id);
      if (!exists) return [...prev, { id, role: "bot", text: "", ...patch(null) }];
      return prev.map((m) => (m.id === id ? { ...m, ...patch(m) } : m));
    });
  }, []);

  const finish = useCallback(() => {
    setIsSending(false);
    setIsTyping(false);
    busyRef.current = false;
  }, []);

  const sendMessage = useCallback(
    (text) => {
      const message = text.trim();
      if (!message || busyRef.current) return false;

      addMessage({ role: "user", text: message });

      const payload = buildPayload(message, userRef.current);
      busyRef.current = true;
      setIsSending(true);
      setIsTyping(true);
      setConnectionStatus("connecting");

      // Stream the reply; if streaming can't start, use the normal request
      const botId = crypto.randomUUID();
      let gotEvent = false;
      const onEvent = (event) => {
        gotEvent = true;
        setConnectionStatus("connected");
        setIsTyping(false); // the streaming message replaces the typing dots
        if (event.type === "status") {
          updateMessage(botId, (m) => (m?.text ? {} : { status: event.text, streaming: true }));
        } else if (event.type === "properties") {
          updateMessage(botId, () => ({ properties: event.properties, streaming: true }));
        } else if (event.type === "delta") {
          setIsTyping(false);
          updateMessage(botId, (m) => ({ text: `${m?.text || ""}${event.text}`, status: null, streaming: true }));
        } else if (event.type === "reset") {
          updateMessage(botId, () => ({ text: "" }));
        } else if (event.type === "done") {
          if (event.session?.guestId) localStorage.setItem(STORAGE_GUEST, event.session.guestId);
          updateMessage(botId, (m) => ({
            text: event.reply || m?.text || "I couldn't find an answer. Please try again.",
            properties: event.properties ?? m?.properties,
            status: null,
            streaming: false,
          }));
          finish();
        } else if (event.type === "error") {
          updateMessage(botId, () => ({ role: "error", text: event.message || "Something went wrong", status: null, streaming: false }));
          finish();
        }
      };

      sendViaStream(payload, onEvent)
        .then(() => {
          if (busyRef.current) finish(); // stream closed without "done"
        })
        .catch((err) => {
          if (gotEvent) {
            finish();
            return;
          }
          // Rate limit / auth errors: show them; otherwise fall back to HTTP
          if (err.status === 429 || err.status === 401) {
            finish();
            addMessage({ role: "error", text: err.message });
            return;
          }
          sendViaHttp(payload)
            .then(handleReply)
            .catch(() => {
          setIsSending(false);
          setIsTyping(false);
          busyRef.current = false;
          setConnectionStatus("disconnected");
          addMessage({
            role: "error",
            text: "AI advisor se connect nahi ho paya. Thodi der baad try karein.",
          });
            });
        });

      return true;
    },
    [addMessage, handleReply, updateMessage, finish],
  );

  useEffect(() => {
    if (!enabled) {
      setConnectionStatus("disconnected");
      setMessages([]);
      setIsLoadingHistory(false);
      initRef.current = false;
      return;
    }

    setConnectionStatus("connected");

    if (initRef.current) return;
    initRef.current = true;

    const initChat = async () => {
      if (user?.id) {
        setIsLoadingHistory(true);
        try {
          const history = await fetchConversationHistory();
          if (history.length > 0) {
            setMessages(history);
            return;
          }
        } catch {
          // Fall through to welcome message
        } finally {
          setIsLoadingHistory(false);
        }
      }

      setMessages([
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: WELCOME_MESSAGE,
        },
      ]);
    };

    initChat();
  }, [enabled, user?.id]);

  return {
    connectionStatus,
    messages,
    isTyping,
    isSending,
    isLoadingHistory,
    sendMessage,
  };
}
