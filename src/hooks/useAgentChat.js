import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_GUEST = "reparv_ai_guest_id";
const WELCOME_MESSAGE =
  "Namaste! Main aapka Reparv AI Advisor hoon. Properties, budget ya site visit — kuch bhi pooch sakte ho.";

function getApiBase() {
  return import.meta.env.VITE_BACKEND_URL || "https://aws-api.reparv.in";
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
  const apiKey = import.meta.env.VITE_AI_AGENT_PUBLIC_KEY;
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

      return true;
    },
    [addMessage, handleReply],
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
