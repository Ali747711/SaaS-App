import { ArrowUpRight, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const revenueByWeek = [
  { label: "W14", value: 42 },
  { label: "W15", value: 58 },
  { label: "W16", value: 49 },
  { label: "W17", value: 71 },
  { label: "W18", value: 63 },
  { label: "W19", value: 84 },
  { label: "W20", value: 92 },
  { label: "W21", value: 78 },
]

const topSources = [
  { nameKey: "analytics.sources.items.organic", share: 42, delta: "+4.2%" },
  { nameKey: "analytics.sources.items.direct", share: 23, delta: "+1.1%" },
  { nameKey: "analytics.sources.items.referral", share: 18, delta: "-0.6%" },
  { nameKey: "analytics.sources.items.social", share: 11, delta: "+2.8%" },
  { nameKey: "analytics.sources.items.email", share: 6, delta: "+0.4%" },
]

const topCountries = [
  { nameKey: "analytics.countries.items.us", share: 38 },
  { nameKey: "analytics.countries.items.de", share: 17 },
  { nameKey: "analytics.countries.items.jp", share: 12 },
  { nameKey: "analytics.countries.items.br", share: 9 },
  { nameKey: "analytics.countries.items.in", share: 7 },
]

export function AnalyticsPage() {
  const { t } = useTranslation()
  const maxRevenue = Math.max(...revenueByWeek.map((w) => w.value))

  const kpis = [
    { label: t("analytics.kpi.sessions"), value: "24,312", delta: "+8.3%" },
    { label: t("analytics.kpi.conversionRate"), value: "4.18%", delta: "+0.6%" },
    { label: t("analytics.kpi.avgOrderValue"), value: "$84.20", delta: "+2.1%" },
    { label: t("analytics.kpi.returningUsers"), value: "62.4%", delta: "+1.9%" },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">{t("analytics.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("analytics.subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardHeader>
              <CardDescription>{kpi.label}</CardDescription>
              <CardTitle className="font-heading text-2xl font-semibold tabular-nums">
                {kpi.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="size-3" />
                {kpi.delta}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("analytics.revenue.title")}</CardTitle>
          <CardDescription>{t("analytics.revenue.description")}</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="8w">
            <TabsList>
              <TabsTrigger value="4w">4W</TabsTrigger>
              <TabsTrigger value="8w">8W</TabsTrigger>
              <TabsTrigger value="12w">12W</TabsTrigger>
            </TabsList>
            <TabsContent value="8w" className="pt-4">
              <div className="flex h-48 items-end gap-3">
                {revenueByWeek.map((w) => (
                  <div key={w.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                      style={{ height: `${(w.value / maxRevenue) * 100}%` }}
                      title={`${w.label}: $${w.value}k`}
                    />
                    <span className="text-xs text-muted-foreground">{w.label}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="4w" className="pt-4">
              <div className="flex h-48 items-end gap-3">
                {revenueByWeek.slice(-4).map((w) => (
                  <div key={w.label} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-md bg-primary/80"
                      style={{ height: `${(w.value / maxRevenue) * 100}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{w.label}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="12w" className="pt-4">
              <p className="text-sm text-muted-foreground">
                {t("analytics.revenue.extend")}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle>{t("analytics.sources.title")}</CardTitle>
            <CardDescription>{t("analytics.sources.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            {topSources.map((source) => (
              <div key={source.nameKey} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t(source.nameKey)}</span>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="tabular-nums">{source.share}%</span>
                    <Badge variant="outline" className="font-mono">
                      {source.delta}
                    </Badge>
                  </div>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${source.share}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <CardTitle>{t("analytics.countries.title")}</CardTitle>
            <CardDescription>{t("analytics.countries.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            {topCountries.map((country) => (
              <div key={country.nameKey} className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <TrendingUp className="size-4" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{t(country.nameKey)}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {country.share}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${country.share}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
