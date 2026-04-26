import {
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Users,
  LifeBuoy,
  Search,
  Bot,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { useUser } from "@clerk/react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type Page =
  | "dashboard"
  | "orders"
  | "customers"
  | "products"
  | "analytics"
  | "settings"
  | "support"
  | "agent"

type NavItem = {
  page: Page
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

const navMain: NavItem[] = [
  { page: "dashboard", icon: LayoutDashboard },
  { page: "orders", icon: ShoppingCart, badge: "12" },
  { page: "customers", icon: Users },
  { page: "products", icon: Package },
  { page: "analytics", icon: BarChart3 },
]

const navSecondary: NavItem[] = [
  { page: "agent", icon: Bot },
  { page: "settings", icon: Settings },
  { page: "support", icon: LifeBuoy },
]

type AppSidebarProps = {
  activePage: Page
  onNavigate: (page: Page) => void
}

export function AppSidebar({ activePage, onNavigate }: AppSidebarProps) {
  const { t } = useTranslation()
  const { user } = useUser()

  const displayName = user?.fullName ?? user?.username ?? "—"
  const email = user?.primaryEmailAddress?.emailAddress ?? ""
  const avatarUrl = user?.imageUrl
  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map((n) => n![0].toUpperCase())
    .join("") || "?"

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Search className="size-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading text-sm font-semibold">
                  {t("brand.name")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("brand.workspace")}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.platform")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navMain.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton
                    isActive={activePage === item.page}
                    onClick={() => onNavigate(item.page)}
                  >
                    <item.icon />
                    <span>{t(`nav.${item.page}`)}</span>
                    {item.badge ? (
                      <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">
                        {item.badge}
                      </span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.account")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navSecondary.map((item) => (
                <SidebarMenuItem key={item.page}>
                  <SidebarMenuButton
                    isActive={activePage === item.page}
                    onClick={() => onNavigate(item.page)}
                  >
                    <item.icon />
                    <span>{t(`nav.${item.page}`)}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="gap-3">
              <Avatar className="size-8">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate text-sm font-medium">{displayName}</span>
                <span className="truncate text-xs text-muted-foreground">{email}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
