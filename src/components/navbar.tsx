import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { useCart } from "@/context/cart-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { t, lang, toggleLang } = useLanguage()
  const { count, setIsOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/boutique", label: t.nav.shop },
    { to: "/cours", label: t.nav.courses },
    { to: "/galerie", label: t.nav.gallery },
    { to: "/a-propos", label: t.nav.about },
    { to: "/contact", label: t.nav.contact },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg">
            L
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground">
            {t.common.brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.to ? "text-primary" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            aria-label="Change language"
          >
            {lang === "fr" ? "FR / EN" : "EN / FR"}
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
            aria-label={t.nav.cart}
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                  location.pathname === link.to ? "text-primary" : "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
