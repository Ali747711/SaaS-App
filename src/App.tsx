import * as React from "react"
import { Bell, Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { UserButton } from "@clerk/react"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar, type Page } from "@/components/dashboard/app-sidebar"
import { AuthGuard } from "@/components/auth/auth-guard"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { SettingsPage } from "@/components/settings/settings-page"
import { OrdersPage } from "@/components/orders/orders-page"
import { CustomersPage } from "@/components/customers/customers-page"
import { ProductsPage } from "@/components/products/products-page"
import { AnalyticsPage } from "@/components/analytics/analytics-page"
import { SupportPage } from "@/components/support/support-page"
import { AgentChatUI } from "@/components/agent-chat/agent-chat-ui"

function DashboardPage() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">
          {t("dashboard.title")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("dashboard.subtitle")}
        </p>
      </div>
      <StatsCards />
      <RecentOrders />
    </div>
  )
}

export function App() {
  const { t } = useTranslation()
  const [page, setPage] = React.useState<Page>("dashboard")

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <DashboardPage />
      case "settings":
        return <SettingsPage />
      case "orders":
        return <OrdersPage />
      case "customers":
        return <CustomersPage />
      case "products":
        return <ProductsPage />
      case "analytics":
        return <AnalyticsPage />
      case "support":
        return <SupportPage />
      case "agent":
        return <AgentChatUI />
    }
  }

  return (
    <AuthGuard>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar activePage={page} onNavigate={setPage} />
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="relative hidden max-w-sm flex-1 md:block">
                <Search className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder={t("header.searchPlaceholder")}
                  className="pl-8"
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
                <Button variant="ghost" size="icon" className="size-9">
                  <Bell className="size-4" />
                  <span className="sr-only">{t("header.notifications")}</span>
                </Button>
                <UserButton />
              </div>
            </header>
            <main className={["flex flex-1 flex-col", page === "agent" ? "overflow-hidden p-4 md:p-6" : "gap-6 p-4 md:p-6"].join(" ")}>
              {renderPage()}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </AuthGuard>
  )
}

export default App
