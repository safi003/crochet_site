import { useState } from "react"
import { Mail, MapPin, Check } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import ElectricBorder from "../components/ElectricBorder"

export function ContactPage() {
  const { t } = useLanguage()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-semibold text-foreground">{t.contact.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.contact.subtitle}</p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Mail className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">bonjour@atelier-lila.fr</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Instagram</p>
              <p className="text-sm text-muted-foreground">@atelier.lila</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <MapPin className="size-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Atelier</p>
              <p className="text-sm text-muted-foreground">Lyon, France</p>
            </div>
          </div>
        </div>

        <ElectricBorder color="oklch(0.62 0.13 42)" glowColor="oklch(0.88 0.022 78)" borderRadius={16} className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card p-6">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">{t.contact.name}</label>
              <input
                id="name"
                required
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">{t.contact.email}</label>
              <input
                id="email"
                type="email"
                required
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">{t.contact.message}</label>
              <textarea
                id="message"
                required
                rows={4}
                className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {sent ? <Check className="size-4" /> : null}
              {sent ? t.contact.sent : t.contact.send}
            </button>
          </form>
        </ElectricBorder>
      </div>
    </div>
  )
}
