import { SignUp } from "@clerk/react"
import { ShieldCheck, Sparkles, Zap } from "lucide-react"

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

const perks = [
  {
    icon: Zap,
    label: "Up and running in minutes",
    description: "Connect your store and start selling immediately",
  },
  {
    icon: ShieldCheck,
    label: "Enterprise-grade security",
    description: "Your data is encrypted and always protected",
  },
  {
    icon: Sparkles,
    label: "AI-powered agent",
    description: "Let the AI handle customer support and insights",
  },
]

interface SignUpPageProps {
  onSignIn: () => void
}

export function SignUpPage({ onSignIn }: SignUpPageProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1fr]">
      {/* ── Left: Form panel ──────────────────────────────────── */}
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
            <h2 className="text-2xl font-bold tracking-tight">Create an account</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Start managing your store in minutes
            </p>
          </div>

          {/* Clerk form */}
          <SignUp appearance={clerkAppearance} />

          {/* Sign-in link */}
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <span className="text-sm text-muted-foreground">Already have an account?</span>
            <button
              onClick={onSignIn}
              className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: Brand panel ────────────────────────────────── */}
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
        {/* Glow orbs */}
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
            <span className="text-[11px] font-bold leading-none text-foreground">NS</span>
          </div>
          <span className="text-sm font-semibold text-background">Nabiev Store</span>
        </div>

        {/* Large decorative number */}
        <div className="pointer-events-none relative z-10 mt-10 select-none">
          <span className="text-[10rem] font-black leading-none tracking-tighter text-background/5">
            NS
          </span>
        </div>

        {/* Headline */}
        <div className="relative z-10 mt-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-background/40">
            Join thousands of merchants
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.15] tracking-tight text-background">
            Everything you need<br />to run a modern<br />online store.
          </h1>
        </div>

        {/* Perks list */}
        <div className="relative z-10 mt-10 space-y-3">
          {perks.map(({ icon: Icon, label, description }) => (
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

        {/* Bottom badge */}
        <div className="relative z-10 mt-10 border-t border-background/10 pt-8">
          <p className="text-xs text-background/30">
            Free to start · No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </div>
  )
}
