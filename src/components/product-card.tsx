import { Plus, Check } from "lucide-react"
import { useState } from "react"
import type { Product } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { t, lang } = useLanguage()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name[lang]}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            {t.common.handmade}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium text-foreground">{product.name[lang]}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.description[lang]}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-foreground">{product.price} €</span>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
            {added ? t.common.added : t.common.addToCart}
          </button>
        </div>
      </div>
    </div>
  )
}
