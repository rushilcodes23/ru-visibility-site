// "How did you hear about us?" — optional on both forms. It is the only
// reliable record of visitors sent by ChatGPT and other AI assistants, whose
// referrals analytics often files as direct traffic. A fixed list, checked
// again on the server, so the email only ever carries one of these strings.
//
// A plain module rather than the "use server" actions: those can only export
// async functions, and the forms need this list on the client too.
export const HEARD_FROM = [
  "Google search",
  "ChatGPT, Gemini or another AI assistant",
  "LinkedIn",
  "X (Twitter)",
  "Upwork or Fiverr",
  "A friend or colleague",
  "Something else",
] as const;

/** The submitted answer if it is one of the options above, otherwise "". */
export function heardFrom(value: unknown): string {
  const v = String(value ?? "");
  return (HEARD_FROM as readonly string[]).includes(v) ? v : "";
}
