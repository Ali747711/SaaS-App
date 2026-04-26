import { Mail, Phone, Plus, UserPlus } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Customer = {
  name: string
  email: string
  phone: string
  plan: "Free" | "Pro" | "Enterprise"
  spend: string
  orders: number
  initials: string
}

const customers: Customer[] = [
  { name: "Sarah Chen", email: "sarah@pixelworks.io", phone: "+1 (415) 555-0182", plan: "Enterprise", spend: "$12,480", orders: 42, initials: "SC" },
  { name: "Marco Rossi", email: "marco@rossi.studio", phone: "+39 02 5550 4411", plan: "Pro", spend: "$4,210", orders: 18, initials: "MR" },
  { name: "Amara Okafor", email: "amara@lumeo.ai", phone: "+234 701 555 9023", plan: "Enterprise", spend: "$9,860", orders: 31, initials: "AO" },
  { name: "Kenji Tanaka", email: "kenji@northwave.jp", phone: "+81 3 5555 2210", plan: "Free", spend: "$180", orders: 2, initials: "KT" },
  { name: "Priya Nair", email: "priya@altitude.co", phone: "+91 98765 00921", plan: "Pro", spend: "$6,540", orders: 24, initials: "PN" },
  { name: "Luca Ferrari", email: "luca@monolith.dev", phone: "+39 055 555 7788", plan: "Pro", spend: "$2,900", orders: 11, initials: "LF" },
]

const planVariant: Record<Customer["plan"], "default" | "secondary" | "outline"> = {
  Enterprise: "default",
  Pro: "secondary",
  Free: "outline",
}

export function CustomersPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">{t("customers.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("customers.subtitle")}</p>
        </div>
        <Button size="sm">
          <Plus className="size-4" />
          {t("customers.add")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>{t("customers.total")}</CardDescription>
            <CardTitle className="font-heading text-2xl font-semibold tabular-nums">
              1,248
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>{t("customers.paying")}</CardDescription>
            <CardTitle className="font-heading text-2xl font-semibold tabular-nums">
              864
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>{t("customers.avgLtv")}</CardDescription>
            <CardTitle className="font-heading text-2xl font-semibold tabular-nums">
              $3,420
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.email}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="size-10">
                  <AvatarFallback>{customer.initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col leading-tight">
                  <CardTitle className="text-sm">{customer.name}</CardTitle>
                  <CardDescription>
                    <Badge variant={planVariant[customer.plan]} className="mt-1">
                      {t(`customers.plans.${customer.plan}`)}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="size-3.5" />
                <span className="truncate">{customer.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="size-3.5" />
                <span>{customer.phone}</span>
              </div>
              <div className="mt-1 flex items-center justify-between border-t pt-3">
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{t("customers.lifetime")}</span>
                  <span className="font-medium tabular-nums">{customer.spend}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground">{t("customers.orders")}</span>
                  <span className="font-medium tabular-nums">{customer.orders}</span>
                </div>
                <Button variant="outline" size="sm">
                  <UserPlus className="size-4" />
                  {t("customers.view")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
