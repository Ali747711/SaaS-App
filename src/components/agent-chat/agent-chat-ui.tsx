import * as React from "react"
import { Mic, Send, Square, Bot } from "lucide-react"
import { type AgentState } from "@livekit/components-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { AgentAudioVisualizerAura } from "@/components/agents-ui/agent-audio-visualizer-aura"

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

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: string
}

const MOCK_MESSAGES: Message[] = [
  { id: "1", text: "Hello! How can I assist you today?", isUser: false, timestamp: "10:30 AM" },
  { id: "2", text: "I need help with my account settings.", isUser: true, timestamp: "10:31 AM" },
  {
    id: "3",
    text: "I'd be happy to help you with that. Let me pull up your account information right away.",
    isUser: false,
    timestamp: "10:31 AM",
  },
  { id: "4", text: "Great! I'm specifically looking to update my email address.", isUser: true, timestamp: "10:32 AM" },
  {
    id: "5",
    text: "No problem at all! I can guide you through the process of updating your email address step by step.",
    isUser: false,
    timestamp: "10:32 AM",
  },
  { id: "6", text: "Can you also check if 2FA is enabled on my account?", isUser: true, timestamp: "10:33 AM" },
]

function statusVariant(status: AgentStatus): "default" | "secondary" | "outline" {
  if (status === "Speaking") return "default"
  if (status === "Thinking") return "secondary"
  return "outline"
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
  const [agentStatus, setAgentStatus] = React.useState<AgentStatus>("Connected")
  const [isTyping, setIsTyping] = React.useState(false)
  const transcriptRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const statuses: AgentStatus[] = ["Connected", "Thinking", "Speaking"]
    const id = setInterval(() => {
      setAgentStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 3000)
    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    const id = setInterval(() => setIsTyping((v) => !v), 4000)
    return () => clearInterval(id)
  }, [])

  React.useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
    }
  }, [isTyping])

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
            <p className="text-sm font-semibold leading-tight">AI Assistant</p>
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
        /* Voice mode: Aura centered */
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
        /* Chat mode: transcript */
        <div
          ref={transcriptRef}
          className="flex-1 overflow-y-auto px-4 py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-3">
            {MOCK_MESSAGES.map((msg, idx) => (
              <div
                key={msg.id}
                className={["flex", msg.isUser ? "justify-end" : "justify-start"].join(" ")}
                style={{
                  animationName: "agentMsgIn",
                  animationDuration: "0.25s",
                  animationDelay: `${idx * 0.05}s`,
                  animationTimingFunction: "ease-out",
                  animationFillMode: "both",
                }}
              >
                <div
                  className={[
                    "max-w-[72%] rounded-2xl px-4 py-2.5",
                    msg.isUser
                      ? "rounded-tr-sm bg-primary text-primary-foreground"
                      : "rounded-tl-sm border bg-card text-card-foreground",
                  ].join(" ")}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
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
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-tl-sm border bg-card px-4 py-3">
                  <div className="flex items-center gap-1">
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
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div className="border-t px-4 py-3">
        {isVoiceMode ? (
          /* Voice mode: single stop button */
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
          /* Chat mode: input bar */
          <div className="mx-auto flex max-w-2xl items-end gap-2">
            <Textarea
              placeholder="Message AI Assistant…"
              className="min-h-10 max-h-32 resize-none"
              rows={1}
            />
            <Button size="icon" variant="ghost" className="size-9 shrink-0" title="Send">
              <Send className="size-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-9 shrink-0"
              onClick={() => setIsVoiceMode(true)}
              title="Start voice mode"
            >
              <Mic className="size-4" />
            </Button>
          </div>
        )}
      </div>

    </div>
  )
}
