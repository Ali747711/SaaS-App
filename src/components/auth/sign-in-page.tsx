import { SignIn } from "@clerk/react"
import { BarChart3, Package, Users } from "lucide-react"

const clerkAppearance = {
  variables: {
    fontFamily: "inherit",
    fontSize: "0.875rem",
    borderRadius: "0.5rem",
  },
  elements: {
    rootBox: "w-full",
    card: "shadow-none border-0 bg-transparent p-0 w-full",
    header: "hidden",
    footer: "hidden",
    formButtonPrimary:
      "w-full h-9 rounded-md bg-foreground text-background text-sm font-medium shadow-none hover:bg-foreground/90 transition-colors normal-case",
    formFieldInput:
      "h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground shadow-none transition-colors focus:border-foreground focus:outline-none",
    formFieldLabel: "text-xs font-medium text-foreground mb-1.5",
    formFieldLabelRow: "mb-1.5",
    socialButtonsBlockButton:
      "w-full h-9 rounded-md border border-border bg-background text-sm font-medium text-foreground shadow-none hover:bg-muted transition-colors",
    socialButtonsBlockButtonText: "text-sm font-medium",
    socialButtonsProviderIcon: "size-4",
    dividerRow: "my-4",
    dividerLine: "bg-border",
    dividerText: "text-xs text-muted-foreground px-3",
    formFieldRow: "mb-4",
    formFieldError: "mt-1.5",
    formFieldErrorText: "text-xs text-destructive",
    identityPreviewText: "text-sm text-foreground",
    identityPreviewEditButton: "text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
    formResendCodeLink: "text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
    otpCodeFieldInput:
      "h-12 w-10 rounded-md border border-border bg-background text-center text-sm font-medium text-foreground focus:border-foreground focus:outline-none",
    alertBar: "rounded-md border border-destructive/30 bg-destructive/10 p-3 mb-4",
    alertText: "text-xs text-destructive",
    badge: "text-xs",
    formFieldAction: "text-xs text-muted-foreground hover:text-foreground underline-offset-4 hover:underline",
  },
}

const features = [
  {
    icon: BarChart3,
    label: "Real-time Analytics",
    description: "Live sales and performance metrics",
  },
  {
    icon: Package,
    label: "Order Management",
    description: "Track and fulfil orders at scale",
  },
  {
    icon: Users,
    label: "Customer Insights",
    description: "Understand your audience deeply",
  },
]

const stats = [
  { value: "12.4k", label: "Orders" },
  { value: "3.2k", label: "Customers" },
  { value: "$94k", label: "Revenue" },
]

interface SignInPageProps {
  onSignUp: () => void
}

export function SignInPage({ onSignUp }: SignInPageProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
      {/* ── Left: Brand panel ─────────────────────────────────── */}
      <div className="relative hidden flex-col overflow-hidden bg-foreground p-10 lg:flex">
        {/* Dot-grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Bottom-left glow orb */}
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        {/* Top-right glow orb */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
            <span className="text-[11px] font-bold leading-none text-foreground">NS</span>
          </div>
          <span className="text-sm font-semibold text-background">Nabiev Store</span>
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-background/40">
            Admin Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.15] tracking-tight text-background">
            Manage your<br />business with<br />confidence.
          </h1>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/50">
            Real-time insights, streamlined operations, and intelligent automation — all in one place.
          </p>
        </div>

        {/* Feature list */}
        <div className="relative z-10 mt-10 space-y-3">
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-background/10">
                <Icon className="size-3.5 text-background" />
              </div>
              <div>
                <p className="text-sm font-medium text-background">{label}</p>
                <p className="text-xs text-background/40">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="relative z-10 mt-10 grid grid-cols-3 gap-4 border-t border-background/10 pt-8">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className="text-xl font-bold text-background">{value}</p>
              <p className="mt-0.5 text-xs text-background/40">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Form panel ─────────────────────────────────── */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <span className="text-[11px] font-bold leading-none text-background">NS</span>
          </div>
          <span className="text-sm font-semibold">Nabiev Store</span>
        </div>

        <div className="w-full max-w-90">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in to your admin dashboard
            </p>
          </div>

          {/* Clerk form */}
          <SignIn appearance={clerkAppearance} routing="virtual" />

          {/* Sign-up link */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <span className="text-sm text-muted-foreground">New to Nabiev Store?</span>
            <button
              onClick={onSignUp}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
