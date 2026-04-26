import * as React from "react"
import { Mic, Send, Square, Bot } from "lucide-react"
import type Anthropic from "@anthropic-ai/sdk"
import { type AgentState } from "@livekit/components-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AgentAudioVisualizerAura } from "@/components/agents-ui/agent-audio-visualizer-aura"
import { MarkdownMessage } from "@/components/agent-chat/markdown-message"
import { claude, CLAUDE_MODEL, SYSTEM_PROMPT } from "@/lib/claude"

type AgentStatus = "Connected" | "Thinking" | "Speaking"

function toAgentState(status: AgentStatus): AgentState {
  if (status === "Speaking") return "speaking"
  if (status === "Thinking") return "thinking"
  return "listening"
}

function statusLabel(status: AgentStatus) {
  if (status === "Speaking") return "Agent speaking…"
  if (status === "Thinking") return "Processing…"
  return "Listening"
}

function statusVariant(status: AgentStatus): "default" | "secondary" | "outline" {
  if (status === "Speaking") return "default"
  if (status === "Thinking") return "secondary"
  return "outline"
}

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
  isError?: boolean
}

function timestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

function useTimer() {
  const [seconds, setSeconds] = React.useState(0)
  React.useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const m = String(Math.floor(seconds / 60)).padStart(2, "0")
  const s = String(seconds % 60).padStart(2, "0")
  return `${m}:${s}`
}

export function AgentChatUI() {
  const timer = useTimer()
  const [isVoiceMode, setIsVoiceMode] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "intro",
      text: "Hi! I'm Claude. Ask me anything about your store — orders, customers, products, or analytics.",
      isUser: false,
      timestamp: timestamp(),
    },
  ])
  const [input, setInput] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [streamingId, setStreamingId] = React.useState<string | null>(null)
  const transcriptRef = React.useRef<HTMLDivElement>(null)

  const streamingMessage = messages.find((m) => m.id === streamingId)
  const agentStatus: AgentStatus = !isStreaming
    ? "Connected"
    : streamingMessage && streamingMessage.text.length > 0
      ? "Speaking"
      : "Thinking"

  React.useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [messages])

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: trimmed,
      isUser: true,
      timestamp: timestamp(),
    }
    const assistantId = crypto.randomUUID()
    const assistantPlaceholder: Message = {
      id: assistantId,
      text: "",
      isUser: false,
      timestamp: timestamp(),
    }

    const history: Anthropic.MessageParam[] = messages
      .filter((m) => m.id !== "intro" && !m.isError && m.text.length > 0)
      .map((m) => ({
        role: m.isUser ? ("user" as const) : ("assistant" as const),
        content: m.text,
      }))
    history.push({ role: "user", content: trimmed })

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder])
    setInput("")
    setIsStreaming(true)
    setStreamingId(assistantId)

    try {
      const stream = claude.messages.stream({
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        system: [
          {
            type: "text",
            text: SYSTEM_PROMPT,
            cache_control: { type: "ephemeral" },
          },
        ],
        messages: history,
      })

      stream.on("text", (delta) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + delta } : m))
        )
      })

      await stream.finalMessage()
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : "Something went wrong calling Claude."
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, text: `Error: ${errorText}`, isError: true }
            : m
        )
      )
    } finally {
      setIsStreaming(false)
      setStreamingId(null)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm">

      {/* ── Session Header ─────────────────────────────── */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Avatar className="size-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary">
              <Bot className="size-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold leading-tight">Claude Assistant</p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <span
                className={[
                  "inline-block size-1.5 rounded-full",
                  agentStatus === "Speaking" ? "bg-emerald-500 animate-pulse" : "",
                  agentStatus === "Thinking" ? "bg-amber-400 animate-pulse" : "",
                  agentStatus === "Connected" ? "bg-emerald-500" : "",
                ].join(" ")}
              />
              <Badge variant={statusVariant(agentStatus)} className="h-4 px-1.5 text-[10px]">
                {agentStatus}
              </Badge>
            </div>
          </div>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{timer}</span>
      </div>

      {/* ── Main content area ──────────────────────────── */}
      {isVoiceMode ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6">
          <AgentAudioVisualizerAura
            size="xl"
            state={toAgentState(agentStatus)}
            color="#1FD5F9"
            colorShift={0.3}
          />
          <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            {statusLabel(agentStatus)}
          </p>
        </div>
      ) : (
        <div
          ref={transcriptRef}
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {messages.map((msg, idx) => {
              const showTypingDots =
                !msg.isUser && msg.id === streamingId && msg.text.length === 0
              return (
                <div
                  key={msg.id}
                  className={["flex", msg.isUser ? "justify-end" : "justify-start"].join(" ")}
                  style={{
                    animationName: "agentMsgIn",
                    animationDuration: "0.25s",
                    animationDelay: `${Math.min(idx, 5) * 0.05}s`,
                    animationTimingFunction: "ease-out",
                    animationFillMode: "both",
                  }}
                >
                  <div
                    className={[
                      "max-w-[72%] rounded-2xl px-4 py-2.5",
                      msg.isUser
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : msg.isError
                          ? "rounded-tl-sm border border-destructive/40 bg-destructive/10 text-destructive"
                          : "rounded-tl-sm border bg-card text-card-foreground",
                    ].join(" ")}
                  >
                    {showTypingDots ? (
                      <div className="flex items-center gap-1 py-1">
                        {[0, 0.2, 0.4].map((delay, i) => (
                          <span
                            key={i}
                            className="inline-block size-2 rounded-full bg-primary/60"
                            style={{
                              animationName: "agentDot",
                              animationDuration: "1s",
                              animationDelay: `${delay}s`,
                              animationTimingFunction: "ease-in-out",
                              animationIterationCount: "infinite",
                            }}
                          />
                        ))}
                      </div>
                    ) : msg.isUser || msg.isError ? (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <MarkdownMessage content={msg.text} isUser={msg.isUser} />
                    )}
                    <p
                      className={[
                        "mt-1 text-[10px]",
                        msg.isUser ? "text-primary-foreground/60" : "text-muted-foreground",
                      ].join(" ")}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="border-t px-4 py-3">
        {isVoiceMode ? (
          <div className="flex justify-center">
            <Button
              size="icon"
              variant="destructive"
              className="size-14 rounded-full"
              onClick={() => setIsVoiceMode(false)}
              title="Stop voice mode"
            >
              <Square className="size-5 fill-current" />
            </Button>
          </div>
        ) : (
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Claude…"
              className="min-h-10 max-h-32 resize-none"
              rows={1}
              disabled={isStreaming}
            />
            <Button
              size="icon"
              variant="ghost"
              className="size-9 shrink-0"
              onClick={handleSend}
              disabled={isStreaming || input.trim().length === 0}
              title="Send"
            >
              <Send className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-9 shrink-0"
              onClick={() => setIsVoiceMode(true)}
              title="Start voice mode"
              disabled={isStreaming}
            >
              <Mic className="size-4" />
            </Button>
          </div>
        )}
      </div>

    </div>
  )
}
