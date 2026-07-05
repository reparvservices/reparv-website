export const OPEN_AGENT_ADVISOR_EVENT = "reparv:open-agent-advisor";

export function openAgentAdvisor(message) {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(OPEN_AGENT_ADVISOR_EVENT, {
      detail: { message: message || null },
    }),
  );
}
