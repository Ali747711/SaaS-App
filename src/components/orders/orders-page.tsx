import * as React from "react"
import { Download, Filter, Plus, Search } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type OrderStatus = "paid" | "pending" | "refunded" | "failed"

type Order = {
  id: string
  customer: string
  channel: string
  amount: string
  status: OrderStatus
  date: string
}

const orders: Order[] = [
  { id: "#INV-1042", customer: "Sarah Chen", channel: "Web", amount: "$1,249.00", status: "paid", date: "Apr 21, 2026" },
  { id: "#INV-1041", customer: "Marco Rossi", channel: "iOS", amount: "$420.00", status: "pending", date: "Apr 20, 2026" },
  { id: "#INV-1040", customer: "Amara Okafor", channel: "Web", amount: "$3,980.00", status: "paid", date: "Apr 20, 2026" },
  { id: "#INV-1039", customer: "Kenji Tanaka", channel: "Android", amount: "$180.00", status: "refunded", date: "Apr 19, 2026" },
  { id: "#INV-1038", customer: "Priya Nair", channel: "Web", amount: "$2,310.00", status: "paid", date: "Apr 18, 2026" },
  { id: "#INV-1037", customer: "Luca Ferrari", channel: "iOS", amount: "$640.00", status: "failed", date: "Apr 18, 2026" },
  { id: "#INV-1036", customer: "Fatima Zahra", channel: "Web", amount: "$890.00", status: "paid", date: "Apr 17, 2026" },
  { id: "#INV-1035", customer: "Diego Morales", channel: "Android", amount: "$1,120.00", status: "pending", date: "Apr 17, 2026" },
]

const statusVariant: Record<OrderStatus, "default" | "secondary" | "destructive" | "outline"> = {
  paid: "default",
  pending: "secondary",
  refunded: "outline",
  failed: "destructive",
}

export function OrdersPage() {
  const { t } = useTranslation()
  const [query, setQuery] = React.useState("")
  const [channel, setChannel] = React.useState("all")
  const [tab, setTab] = React.useState("all")

  const filtered = orders.filter((order) => {
    if (tab !== "all" && order.status !== tab) return false
    if (channel !== "all" && order.channel.toLowerCase() !== channel) return false
    if (query && !order.id.toLowerCase().includes(query.toLowerCase()) && !order.customer.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">{t("orders.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("orders.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            {t("common.export")}
          </Button>
          <Button size="sm">
            <Plus className="size-4" />
            {t("orders.newOrder")}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("orders.allOrders")}</CardTitle>
          <CardDescription>{t("orders.results", { count: filtered.length })}</CardDescription>
          <CardAction>
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="all">{t("orders.tabs.all")}</TabsTrigger>
                <TabsTrigger value="paid">{t("orders.tabs.paid")}</TabsTrigger>
                <TabsTrigger value="pending">{t("orders.tabs.pending")}</TabsTrigger>
                <TabsTrigger value="refunded">{t("orders.tabs.refunded")}</TabsTrigger>
                <TabsTrigger value="failed">{t("orders.tabs.failed")}</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardAction>
        </CardHeader>
        <div className="flex flex-wrap gap-2 px-4 pt-4">
          <div className="relative min-w-60 flex-1">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("orders.searchPlaceholder")}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder={t("orders.channel")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("orders.allChannels")}</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
              <SelectItem value="android">Android</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="size-4" />
            {t("orders.moreFilters")}
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox />
              </TableHead>
              <TableHead>{t("dashboard.recentOrders.invoice")}</TableHead>
              <TableHead>{t("dashboard.recentOrders.customer")}</TableHead>
              <TableHead>{t("orders.columns.channel")}</TableHead>
              <TableHead>{t("dashboard.recentOrders.status")}</TableHead>
              <TableHead>{t("dashboard.recentOrders.date")}</TableHead>
              <TableHead className="text-right">{t("dashboard.recentOrders.amount")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.channel}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>
                    {t(`status.${order.status}`)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="text-right font-medium tabular-nums">
                  {order.amount}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  {t("orders.noResults")}
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
