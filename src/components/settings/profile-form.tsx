import * as React from "react"
import { Upload } from "lucide-react"
import { useTranslation } from "react-i18next"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

type ProfileState = {
  name: string
  username: string
  email: string
  role: string
  bio: string
  marketingEmails: boolean
  productUpdates: boolean
}

const initialState: ProfileState = {
  name: "Azamat Nabiev",
  username: "azamat",
  email: "alexnabiyev5@gmail.com",
  role: "Full-stack engineer",
  bio: "Building tools that make repetitive work disappear.",
  marketingEmails: false,
  productUpdates: true,
}

export function ProfileForm() {
  const { t } = useTranslation()
  const [profile, setProfile] = React.useState<ProfileState>(initialState)
  const [saved, setSaved] = React.useState(false)

  const update = <K extends keyof ProfileState>(
    key: K,
    value: ProfileState[K]
  ) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaved(true)
  }

  const handleReset = () => {
    setProfile(initialState)
    setSaved(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("settings.profile.title")}</CardTitle>
          <CardDescription>{t("settings.profile.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-2">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="text-lg">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <Button type="button" variant="outline" size="sm">
                <Upload className="size-4" />
                {t("settings.profile.upload")}
              </Button>
              <p className="text-xs text-muted-foreground">
                {t("settings.profile.uploadHint")}
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">{t("settings.profile.fullName")}</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => update("name", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">{t("settings.profile.username")}</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => update("username", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t("settings.profile.email")}</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="role">{t("settings.profile.role")}</Label>
              <Input
                id="role"
                value={profile.role}
                onChange={(e) => update("role", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="bio">{t("settings.profile.bio")}</Label>
            <Textarea
              id="bio"
              rows={4}
              value={profile.bio}
              onChange={(e) => update("bio", e.target.value)}
              placeholder={t("settings.profile.bioPlaceholder")}
            />
            <p className="text-xs text-muted-foreground">
              {t("settings.profile.bioHint")}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b">
          <CardTitle>{t("settings.email.title")}</CardTitle>
          <CardDescription>{t("settings.email.description")}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="product-updates" className="font-medium">
                {t("settings.email.productUpdates")}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t("settings.email.productUpdatesHint")}
              </p>
            </div>
            <Switch
              id="product-updates"
              checked={profile.productUpdates}
              onCheckedChange={(v) => update("productUpdates", v)}
            />
          </div>
          <Separator />
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Label htmlFor="marketing-emails" className="font-medium">
                {t("settings.email.marketing")}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t("settings.email.marketingHint")}
              </p>
            </div>
            <Switch
              id="marketing-emails"
              checked={profile.marketingEmails}
              onCheckedChange={(v) => update("marketingEmails", v)}
            />
          </div>
        </CardContent>
        <CardFooter className="justify-between">
          <p className="text-xs text-muted-foreground">
            {saved ? t("settings.saved") : t("settings.unsaved")}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleReset}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("common.save")}</Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}
