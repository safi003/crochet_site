import { Link } from "react-router-dom"
import { Mail, Heart } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { categories } from "@/lib/data"

export function Footer() {
  const { t, lang } = useLanguage()

  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif text-lg">
              L
            </span>
            <span className="font-serif text-xl font-semibold text-foreground">{t.common.brand}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          <div className="mt-4 flex gap-3">
            <a href="#" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <Link to="/contact" className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted" aria-label="Email">
              <Mail className="size-4" />
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t.footer.shop}</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/boutique?cat=${c.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">{t.footer.info}</h4>
          <ul className="mt-4 flex flex-col gap-2.5">
            <li><Link to="/cours" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t.nav.courses}</Link></li>
            <li><Link to="/galerie" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t.nav.gallery}</Link></li>
            <li><Link to="/a-propos" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t.nav.about}</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-primary">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Newsletter</h4>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer.newsletter}</p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="email@exemple.com"
              className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
            />
            <button type="submit" className="h-10 shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              {t.footer.subscribe}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {t.common.brand}. {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            {lang === "fr" ? "Fait avec" : "Made with"} <Heart className="size-3 fill-primary text-primary" /> {lang === "fr" ? "et de la laine" : "and yarn"}
          </p>
        </div>
      </div>
    </footer>
  )
}
