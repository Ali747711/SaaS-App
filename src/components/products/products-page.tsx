import { Plus, Package } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Product = {
  name: string
  sku: string
  category: string
  price: string
  stock: number
  stockMax: number
  status: "active" | "draft" | "archived"
}

const products: Product[] = [
  { name: "Atlas Wireless Headphones", sku: "ATL-WH-01", category: "Audio", price: "$249.00", stock: 142, stockMax: 200, status: "active" },
  { name: "Nimbus Smart Lamp", sku: "NIM-LP-12", category: "Home", price: "$89.00", stock: 36, stockMax: 150, status: "active" },
  { name: "Orbit Mechanical Keyboard", sku: "ORB-KB-03", category: "Desk", price: "$179.00", stock: 78, stockMax: 120, status: "active" },
  { name: "Verge Leather Backpack", sku: "VRG-BP-07", category: "Bags", price: "$199.00", stock: 0, stockMax: 80, status: "draft" },
  { name: "Ember Ceramic Mug", sku: "EMB-MG-05", category: "Home", price: "$34.00", stock: 210, stockMax: 300, status: "active" },
  { name: "Pulse Fitness Band", sku: "PLS-FB-22", category: "Wearables", price: "$129.00", stock: 12, stockMax: 100, status: "archived" },
]

const statusVariant: Record<Product["status"], "default" | "secondary" | "outline"> = {
  active: "default",
  draft: "secondary",
  archived: "outline",
}

export function ProductsPage() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-heading text-2xl font-semibold">{t("products.title")}</h1>
          <p className="text-sm text-muted-foreground">{t("products.subtitle")}</p>
        </div>
        <Button size="sm">
          <Plus className="size-4" />
          {t("products.new")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => {
          const pct = Math.round((product.stock / product.stockMax) * 100)
          const low = product.stock > 0 && product.stock < product.stockMax * 0.2
          return (
            <Card key={product.sku}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Package className="size-5" />
                </div>
                <CardTitle className="mt-2 text-base">{product.name}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {product.sku} · {product.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-semibold tabular-nums">
                    {product.price}
                  </span>
                  <Badge variant={statusVariant[product.status]}>
                    {t(`status.${product.status}`)}
                  </Badge>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{t("products.stock")}</span>
                    <span
                      className={
                        product.stock === 0
                          ? "text-destructive"
                          : low
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-muted-foreground"
                      }
                    >
                      {product.stock} / {product.stockMax}
                    </span>
                  </div>
                  <Progress value={pct} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
