import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useLanguage } from "@/context/language-context"
import { Link } from "react-router-dom"

const WHATSAPP_NUMBER = "221788762332"

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, subtotal } = useCart()
  const { t, lang } = useLanguage()

  const whatsappOrder = () => {
    const message = items
      .map((i) => `• ${i.product.name[lang]} x${i.quantity} = ${i.product.price * i.quantity} €`)
      .join("\n")
    const total = `${t.cart.subtotal} : ${subtotal} €`
    const text = encodeURIComponent(`${message}\n\n${total}`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank")
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-50 bg-foreground/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />

      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label={t.cart.title}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-serif text-xl font-semibold text-foreground">{t.cart.title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <ShoppingBag className="size-7" />
            </span>
            <p className="text-muted-foreground">{t.cart.empty}</p>
            <Link
              to="/boutique"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.cart.keepShopping}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name[lang]}
                      loading="lazy"
                      className="size-20 shrink-0 rounded-lg border border-border object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">{item.product.name[lang]}</p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={t.cart.remove}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-sm text-primary">{item.product.price} €</p>
                      <div className="mt-auto flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex size-7 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                          aria-label="Minus"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex size-7 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                          aria-label="Plus"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border px-5 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.cart.subtotal}</span>
                <span className="font-serif text-xl font-semibold text-foreground">{subtotal} €</span>
              </div>
              <button
                onClick={whatsappOrder}
                className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t.cart.checkout}
              </button>
              <p className="mt-2 text-center text-xs text-muted-foreground">{t.cart.note}</p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
