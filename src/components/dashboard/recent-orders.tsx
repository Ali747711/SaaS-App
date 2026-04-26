import { MoreHorizontal } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type OrderStatus = "paid" | "pending" | "refunded" | "failed"

type Order = {
  id: string
  customer: string
  email: string
  initials: string
  amount: string
  status: OrderStatus
  date: string
}

const orders: Order[] = [
  {
    id: "#INV-1042",
    customer: "Sarah Chen",
    email: "sarah@pixelworks.io",
    initials: "SC",
    amount: "$1,249.00",
    status: "paid",
    date: "Apr 21, 2026",
  },
  {
    id: "#INV-1041",
    customer: "Marco Rossi",
    email: "marco@rossi.studio",
    initials: "MR",
    amount: "$420.00",
    status: "pending",
    date: "Apr 20, 2026",
  },
  {
    id: "#INV-1040",
    customer: "Amara Okafor",
    email: "amara@lumeo.ai",
    initials: "AO",
    amount: "$3,980.00",
    status: "paid",
    date: "Apr 20, 2026",
  },
  {
    id: "#INV-1039",
    customer: "Kenji Tanaka",
    email: "kenji@northwave.jp",
    initials: "KT",
    amount: "$180.00",
    status: "refunded",
    date: "Apr 19, 2026",
  },
  {
    id: "#INV-1038",
    customer: "Priya Nair",
    email: "priya@altitude.co",
    initials: "PN",
    amount: "$2,310.00",
    status: "paid",
    date: "Apr 18, 2026",
  },
  {
    id: "#INV-1037",
    customer: "Luca Ferrari",
    email: "luca@monolith.dev",
    initials: "LF",
    amount: "$640.00",
    status: "failed",
    date: "Apr 18, 2026",
  },
  {
    id: "#INV-1036",
    customer: "Ulugbek",
    email: "beki@gmail.com",
    initials: "UB",
    amount: "$640.00",
    status: "paid",
    date: "Apr 18, 2026",
  },
]

const statusVariant: Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  paid: "default",
  pending: "secondary",
  refunded: "outline",
  failed: "destructive",
}

export function RecentOrders() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>{t("dashboard.recentOrders.title")}</CardTitle>
        <CardDescription>{t("dashboard.recentOrders.description")}</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            {t("common.export")}
          </Button>
        </CardAction>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("dashboard.recentOrders.invoice")}</TableHead>
            <TableHead>{t("dashboard.recentOrders.customer")}</TableHead>
            <TableHead>{t("dashboard.recentOrders.status")}</TableHead>
            <TableHead>{t("dashboard.recentOrders.date")}</TableHead>
            <TableHead className="text-right">{t("dashboard.recentOrders.amount")}</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-xs">
                      {order.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col leading-tight">
                    <span className="font-medium">{order.customer}</span>
                    <span className="text-xs text-muted-foreground">
                      {order.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant[order.status]}>
                  {t(`status.${order.status}`)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {order.date}
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {order.amount}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontal className="size-4" />
                      <span className="sr-only">{t("common.openMenu")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>{t("dashboard.recentOrders.viewInvoice")}</DropdownMenuItem>
                    <DropdownMenuItem>{t("dashboard.recentOrders.sendReminder")}</DropdownMenuItem>
                    <DropdownMenuItem variant="destructive">
                      {t("dashboard.recentOrders.refund")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
