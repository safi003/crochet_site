import { useLanguage } from "@/context/language-context"
import { HangingIdCard } from "@/components/lightswind/hangingidcard"
export function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    { value: "10+", label: t.about.statsYears },
    { value: "500+", label: t.about.statsPieces },
    { value: "120+", label: t.about.statsStudents },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-semibold text-foreground">{t.about.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.about.subtitle}</p>
      </header>

      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center">
         <div>
           <HangingIdCard
             name="Lila smith"
             role="crocheteuse"
            badgeId="LW-2025"
            accentColor="var(--primary)"
            ropeLength={100}
            imageSrc="/about-portrait.png"
      />
         </div>
        </div>
        <div className="flex flex-col gap-4 text-pretty leading-relaxed text-muted-foreground">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-secondary/40 p-6 text-center">
            <p className="font-serif text-3xl font-semibold text-primary">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
