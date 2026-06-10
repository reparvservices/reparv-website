"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Sparkles,
  MapPin,
  IndianRupee,
  Home,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import { useAgentChat } from "../../hooks/useAgentChat";

const QUICK_PROMPTS = [
  "2 BHK in Pune under 90L",
  "Properties in Nagpur",
  "Schedule a site visit",
  "Talk to sales team",
];

const PROMPT_MAP = {
  "2 BHK in Pune under 90L": "Show me 2 BHK apartments in Pune under 90 lakh",
  "Properties in Nagpur": "What properties do you have in Nagpur?",
  "Schedule a site visit": "I want to schedule a site visit next Saturday",
  "Talk to sales team": "Connect me with a sales executive",
};

function stripMarkdown(text = "") {
  return String(text)
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\n{2,}/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function getDisplayText(text, properties) {
  if (!properties?.length) return stripMarkdown(text);

  const cleaned = stripMarkdown(text);
  const isVerbose =
    cleaned.length > 200 ||
    /!\[|\[[^\]]+]\(https?:\/\//i.test(text) ||
    /^\s*\d+\.\s/m.test(text);

  if (!isVerbose) return cleaned;

  const loc = properties[0]?.location || "";
  const city = loc.split(",").pop()?.trim() || "Yahan";
  const count = properties.length;
  const noun = count === 1 ? "property" : `${count} properties`;

  return `${city} mein ${noun} mili hain — neeche cards check kariye. Kisi pe details ya site visit chahiye?`;
}

const spring = { type: "spring", stiffness: 420, damping: 32 };
const springSoft = { type: "spring", stiffness: 300, damping: 26 };

function PropertyCard({ property, index }) {
  const isLink = Boolean(property.url);
  const Card = isLink ? motion.a : motion.div;
  const linkProps = isLink
    ? { href: property.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Card
      {...linkProps}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ ...springSoft, delay: index * 0.05 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`group flex w-[158px] sm:w-[210px] shrink-0 snap-start flex-col overflow-hidden rounded-lg sm:rounded-xl border border-[#5308E738] bg-white shadow-sm transition-shadow duration-300 hover:border-[#8A38F5] hover:shadow-[0_6px_20px_rgba(94,35,220,0.14)] ${
        isLink ? "cursor-pointer" : ""
      }`}
    >
      <div className="overflow-hidden">
        {property.imageUrl ? (
          <img
            src={property.imageUrl}
            alt={property.projectName || "Property"}
            loading="lazy"
            className="h-[72px] sm:h-[110px] w-full object-cover bg-[#f6f2fa] transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-[72px] sm:h-[110px] items-center justify-center bg-gradient-to-br from-[#f6f2fa] to-[#ede5fb] text-xs text-[#868686]">
            <Home size={20} className="text-[#8A38F5]/50" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-2 sm:p-3">
        <h4 className="line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] text-[11px] sm:text-[13px] font-semibold leading-snug text-[#1b1b20] transition-colors group-hover:text-[#5E23DC]">
          {property.projectName || "Property"}
        </h4>
        {property.location && (
          <p className="mt-1 flex items-start gap-1 text-[11px] text-[#868686]">
            <MapPin size={10} className="mt-0.5 shrink-0" />
            <span className="line-clamp-2">{property.location}</span>
          </p>
        )}
        {property.bedrooms && (
          <p className="mt-1 line-clamp-1 text-[11px] text-[#484456]">
            {property.bedrooms}
          </p>
        )}
        <p className="mt-auto flex items-center gap-0.5 pt-2 text-[12px] font-semibold text-[#5E23DC]">
          <IndianRupee size={11} />
          {property.price || "Price on request"}
        </p>
      </div>
    </Card>
  );
}

function ChatMessage({ message, index }) {
  if (message.role === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={springSoft}
        className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[13px] text-red-600"
      >
        {message.text}
      </motion.div>
    );
  }

  const isUser = message.role === "user";
  const displayText = isUser
    ? message.text
    : getDisplayText(message.text, message.properties);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: isUser ? 12 : -12 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ ...springSoft, delay: Math.min(index * 0.04, 0.2) }}
      className={`flex w-full flex-col gap-2 sm:gap-3 ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[92%] sm:max-w-[90%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[13px] leading-relaxed whitespace-pre-wrap break-words shadow-sm ${
          isUser
            ? "rounded-br-md bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] text-white"
            : "rounded-bl-md border border-[#5308E720] bg-[#faf8ff] text-[#1b1b20]"
        }`}
      >
        {displayText}
      </div>
      {message.properties?.length > 0 && (
        <div className="w-full">
          <p className="mb-1.5 sm:mb-2 px-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-[#868686]">
            {message.properties.length} Properties found
          </p>
          <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory">
            {message.properties.map((p, i) => (
              <PropertyCard key={`${p.projectName}-${i}`} property={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={springSoft}
      className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-[#5308E720] bg-[#faf8ff] px-3 py-2 sm:px-3.5 sm:py-3 w-fit shadow-sm"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[#8A38F5]"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}

export default function AgentWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const {
    connectionStatus,
    messages,
    isTyping,
    isSending,
    isLoadingHistory,
    sendMessage,
  } = useAgentChat(user, isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sendMessage(input)) {
      setInput("");
    }
  };

  const handlePrompt = (label) => {
    sendMessage(PROMPT_MAP[label] || label);
  };

  const isOnline = connectionStatus === "connected";
  const canSend = input.trim() && !isSending;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[47] bg-black/20 backdrop-blur-[1px] sm:bg-transparent sm:backdrop-blur-none cursor-pointer"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="fixed right-3 sm:right-5 bottom-[76px] md:bottom-6 z-[48] flex flex-col items-end gap-2 sm:gap-3 pointer-events-none">
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              key="chat-panel"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={spring}
              style={{ transformOrigin: "bottom right" }}
              className="pointer-events-auto flex w-[min(340px,calc(100vw-28px))] sm:w-[400px] h-[min(52dvh,420px)] sm:h-[min(86vh,760px)] max-h-[calc(100dvh-84px)] flex-col overflow-hidden rounded-[16px] sm:rounded-[24px] border border-[#5308E720] bg-white shadow-[0_12px_40px_rgba(83,8,231,0.18),0_2px_12px_rgba(0,0,0,0.08)] sm:shadow-[0_20px_64px_rgba(83,8,231,0.22),0_4px_16px_rgba(0,0,0,0.08)]"
            >
              <div className="relative flex shrink-0 items-center gap-2 sm:gap-3 overflow-hidden bg-gradient-to-r from-[#5308e7] via-[#5E23DC] to-[#8A38F5] px-3 py-2.5 sm:px-4 sm:py-4">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                <motion.div
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <Sparkles size={14} className="sm:hidden text-white" />
                  <Sparkles size={18} className="hidden sm:block text-white" />
                </motion.div>
                <div className="relative min-w-0 flex-1">
                  <h3 className="text-[13px] sm:text-[15px] font-bold text-white leading-tight">
                    Reparv AI Advisor
                  </h3>
                  <p className="hidden sm:block text-[11px] text-white/75 truncate">
                    Properties · Budget · Site visits
                  </p>
                </div>
                <div className="relative flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`flex sm:hidden items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                      isOnline
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        isOnline ? "bg-emerald-300" : "bg-amber-300 animate-pulse"
                      }`}
                    />
                    {isOnline ? "On" : "…"}
                  </span>
                  <motion.span
                    layout
                    className={`hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors duration-300 ${
                      isOnline
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        isOnline ? "bg-emerald-300" : "bg-amber-300 animate-pulse"
                      }`}
                    />
                    {isOnline ? "Online" : "Connecting"}
                  </motion.span>
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.18)" }}
                    whileTap={{ scale: 0.92 }}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors hover:text-white"
                    aria-label="Close chat"
                  >
                    <X size={16} className="sm:hidden" />
                    <X size={18} className="hidden sm:block" />
                  </motion.button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto scroll-smooth px-3 py-2.5 sm:px-4 sm:py-4 space-y-2.5 sm:space-y-4 scrollbar-hide bg-gradient-to-b from-white to-[#faf8ff]/50">
                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-6 sm:py-10">
                    <div className="flex items-center gap-2 rounded-full border border-[#5308E720] bg-[#faf8ff] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-[12px] text-[#868686]">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-[#8A38F5]"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{
                            duration: 0.9,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                      Loading your chat…
                    </div>
                  </div>
                ) : (
                  messages.map((msg, i) => (
                    <ChatMessage key={msg.id} message={msg} index={i} />
                  ))
                )}
                <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              <div className="shrink-0 border-t border-[#5308E710] bg-[#fafafa]/80 px-3 pt-2 pb-2 sm:px-4 sm:pt-3 sm:pb-3">
                <p className="mb-1.5 sm:mb-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide text-[#868686]">
                  Quick asks
                </p>
                <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-0.5">
                  {QUICK_PROMPTS.map((label, i) => (
                    <motion.button
                      key={label}
                      type="button"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05, ...springSoft }}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handlePrompt(label)}
                      disabled={isSending}
                      className="shrink-0 cursor-pointer rounded-full border border-[#5308E730] bg-white px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-[11px] font-medium text-[#5E23DC] shadow-sm transition-colors duration-200 hover:border-[#8A38F5] hover:bg-[#f3ecff] hover:text-[#5308e7] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {label}
                    </motion.button>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex shrink-0 items-center gap-2 sm:gap-2.5 border-t border-[#5308E712] bg-white px-3 py-2.5 sm:px-4 sm:py-3.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties…"
                  disabled={isSending}
                  className="flex-1 rounded-lg sm:rounded-xl border border-[#D9D9D9] bg-[#fafafa] px-3 py-2 sm:px-4 sm:py-3 text-[12px] sm:text-[13px] text-[#1b1b20] outline-none transition-all duration-200 placeholder:text-[#868686] focus:border-[#8A38F5] focus:bg-white focus:ring-2 focus:ring-[#8A38F5]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />
                <motion.button
                  type="submit"
                  disabled={!canSend}
                  whileHover={canSend ? { scale: 1.06 } : {}}
                  whileTap={canSend ? { scale: 0.94 } : {}}
                  animate={
                    canSend
                      ? { boxShadow: "0 4px 16px rgba(94,35,220,0.35)" }
                      : { boxShadow: "0 0 0 rgba(94,35,220,0)" }
                  }
                  transition={{ duration: 0.2 }}
                  className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-r from-[#5E23DC] to-[#8A38F5] text-white transition-opacity duration-200 ${
                    canSend
                      ? "cursor-pointer hover:opacity-95"
                      : "cursor-not-allowed opacity-40"
                  }`}
                  aria-label="Send message"
                >
                  <Send size={16} className={canSend ? "translate-x-px" : ""} />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isOpen && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto group relative flex cursor-pointer items-center gap-2 sm:gap-2.5 self-end"
              aria-label="Open AI advisor"
              aria-expanded={false}
            >
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden sm:block rounded-full border border-[#5308E730] bg-white/95 px-3.5 py-2 text-[12px] font-semibold text-[#5E23DC] shadow-[0_4px_16px_rgba(94,35,220,0.15)] backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_6px_22px_rgba(94,35,220,0.25)]"
              >
                Ask Reparv AI
              </motion.span>

              <motion.span
                whileHover={{ boxShadow: "0 10px 32px rgba(94,35,220,0.5)" }}
                className="relative flex h-11 w-11 sm:h-[52px] sm:w-[52px] items-center justify-center rounded-full bg-gradient-to-br from-[#5308e7] via-[#5E23DC] to-[#8A38F5] shadow-[0_4px_20px_rgba(94,35,220,0.35)] sm:shadow-[0_6px_24px_rgba(94,35,220,0.4)]"
              >
                <Bot size={20} className="sm:hidden text-white" />
                <Bot size={24} className="hidden sm:block text-white" />
                <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 sm:h-3.5 sm:w-3.5 pointer-events-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 border-2 border-white" />
                </span>
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
