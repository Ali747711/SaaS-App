import Anthropic from "@anthropic-ai/sdk"

// WARNING: dangerouslyAllowBrowser exposes the API key to anyone who loads
// the site. Acceptable for local dev only — DO NOT deploy this to a public
// host without moving the key behind a backend proxy.
export const claude = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const CLAUDE_MODEL = "claude-haiku-4-5"

export const SYSTEM_PROMPT =
  "You are an AI assistant embedded in the Nabiev Store admin dashboard. " +
  "You help merchants manage orders, customers, products, and analytics. " +
  "Be concise, actionable, and professional."
