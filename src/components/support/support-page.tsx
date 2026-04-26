import * as React from "react"
import { BookOpen, LifeBuoy, MessageCircle, Send, Zap } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Ticket = {
  id: string
  subject: string
  updated: string
  status: "open" | "waiting" | "resolved"
}

const tickets: Ticket[] = [
  { id: "#TCK-2081", subject: "Invoice not generated for Apr 18", updated: "2h ago", status: "open" },
  { id: "#TCK-2076", subject: "How do I invite a teammate?", updated: "1d ago", status: "resolved" },
  { id: "#TCK-2069", subject: "SSO login redirect loop", updated: "3d ago", status: "waiting" },
]

const statusVariant: Record<Ticket["status"], "default" | "secondary" | "outline"> = {
  open: "default",
  waiting: "secondary",
  resolved: "outline",
}

const resources = [
  { key: "docs", icon: BookOpen },
  { key: "quickstart", icon: Zap },
  { key: "community", icon: MessageCircle },
]

export function SupportPage() {
  const { t } = useTranslation()
  const [sent, setSent] = React.useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">{t("support.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("support.subtitle")}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = resource.icon
          return (
            <Card key={resource.key}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <CardTitle className="mt-2 text-base">
                  {t(`support.resources.${resource.key}.title`)}
                </CardTitle>
                <CardDescription>
                  {t(`support.resources.${resource.key}.description`)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  {t("common.open")}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{t("support.tickets.title")}</CardTitle>
            <CardDescription>{t("support.tickets.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-4 last:pb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <LifeBuoy className="size-4" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">{ticket.subject}</span>
                    <span className="text-xs text-muted-foreground">
                      {ticket.id} · {t("support.tickets.updated", { time: ticket.updated })}
                    </span>
                  </div>
                </div>
                <Badge variant={statusVariant[ticket.status]}>
                  {t(`status.${ticket.status}`)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b">
              <CardTitle>{t("support.contact.title")}</CardTitle>
              <CardDescription>{t("support.contact.description")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="topic">{t("support.contact.topic")}</Label>
                <Select defaultValue="billing">
                  <SelectTrigger id="topic">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="billing">{t("support.contact.topics.billing")}</SelectItem>
                    <SelectItem value="technical">{t("support.contact.topics.technical")}</SelectItem>
                    <SelectItem value="feature">{t("support.contact.topics.feature")}</SelectItem>
                    <SelectItem value="other">{t("support.contact.topics.other")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="subject">{t("support.contact.subject")}</Label>
                <Input id="subject" placeholder={t("support.contact.subjectPlaceholder")} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="message">{t("support.contact.message")}</Label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder={t("support.contact.messagePlaceholder")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-xs text-muted-foreground">
                {sent ? t("support.contact.sent") : t("support.contact.replyWithin")}
              </p>
              <Button type="submit">
                <Send className="size-4" />
                {t("support.contact.send")}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
