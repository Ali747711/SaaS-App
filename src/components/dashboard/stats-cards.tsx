import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Stat = {
  labelKey: string
  value: string
  delta: string
  trend: "up" | "down"
  icon: React.ComponentType<{ className?: string }>
}

const stats: Stat[] = [
  {
    labelKey: "dashboard.stats.revenue",
    value: "$48,329",
    delta: "+12.4%",
    trend: "up",
    icon: DollarSign,
  },
  {
    labelKey: "dashboard.stats.newCustomers",
    value: "1,248",
    delta: "+4.1%",
    trend: "up",
    icon: UserPlus,
  },
  {
    labelKey: "dashboard.stats.activeUsers",
    value: "9,642",
    delta: "-1.8%",
    trend: "down",
    icon: Users,
  },
  {
    labelKey: "dashboard.stats.orders",
    value: "872",
    delta: "+7.2%",
    trend: "up",
    icon: ShoppingBag,
  },
]

export function StatsCards() {
  const { t } = useTranslation()

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight
        return (
          <Card key={stat.labelKey}>
            <CardHeader>
              <CardDescription>{t(stat.labelKey)}</CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tabular-nums">
                {stat.value}
              </CardTitle>
              <CardAction>
                <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </div>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1.5 text-xs">
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-medium",
                    stat.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  )}
                >
                  <TrendIcon className="size-3" />
                  {stat.delta}
                </span>
                <span className="text-muted-foreground">{t("common.vsLastMonth")}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
