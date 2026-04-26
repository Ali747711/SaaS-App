import { Check, Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SUPPORTED_LANGUAGES, type Language } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const LANGUAGE_FLAGS: Record<Language, string> = {
  en: "🇬🇧",
  uz: "🇺🇿",
  ko: "🇰🇷",
}

type Variant = "icon" | "compact"

type LanguageSwitcherProps = {
  variant?: Variant
  align?: "start" | "center" | "end"
}

export function LanguageSwitcher({
  variant = "icon",
  align = "end",
}: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation()
  const current = (i18n.resolvedLanguage ?? i18n.language) as Language

  const handleSelect = (lang: Language) => {
    void i18n.changeLanguage(lang)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button variant="ghost" size="icon" className="size-9">
            <Languages className="size-4" />
            <span className="sr-only">{t("language.select")}</span>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="gap-1.5">
            <span className="text-base leading-none">
              {LANGUAGE_FLAGS[current]}
            </span>
            <span className="text-xs font-medium uppercase">{current}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} className="w-44">
        <DropdownMenuLabel>{t("language.label")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = current === lang
          return (
            <DropdownMenuItem
              key={lang}
              onSelect={() => handleSelect(lang)}
              className="gap-2"
            >
              <span className="text-base leading-none">
                {LANGUAGE_FLAGS[lang]}
              </span>
              <span className="flex-1">{t(`language.${lang}`)}</span>
              <Check
                className={cn(
                  "size-4 transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
