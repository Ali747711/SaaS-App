import { useTranslation } from "react-i18next"

import { ProfileForm } from "@/components/settings/profile-form"

export function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-semibold">{t("settings.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("settings.subtitle")}</p>
      </div>
      <ProfileForm />
    </div>
  )
}
