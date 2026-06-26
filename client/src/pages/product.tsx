import { useParams, Link } from "react-router-dom"
import { useLanguage } from "@/context/language-context"
import { products, categories } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import { Plus, Check, ArrowLeft } from "lucide-react"
import { useState } from "react"

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { t, lang } = useLanguage()
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const product = products.find((p) => p.id === id)
  const category = product ? categories.find((c) => c.slug === product.category) : undefined

  const handleAdd = () => {
    if (!product) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="text-muted-foreground">{t.shop.productNotFound}</p>
        <Link
          to="/boutique"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          {t.shop.back}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/boutique"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        {t.shop.back}
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary/50">
          <img
            src={product.image}
            alt={product.name[lang]}
            loading="lazy"
            className="size-full object-cover"
          />
          {product.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {t.common.handmade}
            </span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {category && (
            <Link
              to={`/boutique?cat=${category.slug}`}
              className="mb-2 text-xs font-medium uppercase tracking-wider text-primary hover:underline"
            >
              {category.name[lang]}
            </Link>
          )}

          <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            {product.name[lang]}
          </h1>

          <p className="mt-2 text-2xl font-semibold text-foreground">
            {product.price} €
          </p>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            {product.description[lang]}
          </p>

          <div className="mt-8">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {added ? <Check className="size-4" /> : <Plus className="size-4" />}
              {added ? t.common.added : t.common.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
