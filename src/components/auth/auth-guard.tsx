import * as React from "react"
import { useAuth } from "@clerk/react"

import { Skeleton } from "@/components/ui/skeleton"
import { SignInPage } from "@/components/auth/sign-in-page"
import { SignUpPage } from "@/components/auth/sign-up-page"

type AuthMode = "sign-in" | "sign-up"

function AuthPage() {
  const [mode, setMode] = React.useState<AuthMode>("sign-in")

  if (mode === "sign-up") {
    return <SignUpPage onSignIn={() => setMode("sign-in")} />
  }

  return <SignInPage onSignUp={() => setMode("sign-up")} />
}

function LoadingScreen() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-64 mx-auto" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    </div>
  )
}

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) {
    return <LoadingScreen />
  }

  if (!isSignedIn) {
    return <AuthPage />
  }

  return <>{children}</>
}
