import { useLanguage } from "@/context/language-context"
import { HangingIdCard } from "@/components/lightswind/hangingidcard"
import { FeatureTwo } from "@/components/animata/bento-grid/eight"

export function AboutPage() {
  const { t } = useLanguage()

  const stats = [
    { value: 10, label: t.about.statsYears, suffix: "+ " },
    { value: 500, label: t.about.statsPieces, suffix: "+ " },
    { value: 120, label: t.about.statsStudents, suffix: "+ " },
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
        <FeatureTwo
          targetValue={stats[0].value}
          label={stats[0].label}
          suffix={stats[0].suffix}
          className="rounded-2xl border border-border bg-secondary/40 text-center"
          textClassName="text-primary"
        />
        <FeatureTwo
          targetValue={stats[1].value}
          label={stats[1].label}
          suffix={stats[1].suffix}
          className="rounded-2xl border border-border bg-secondary/40 text-center"
          textClassName="text-primary"
        />
        <FeatureTwo
          targetValue={stats[2].value}
          label={stats[2].label}
          suffix={stats[2].suffix}
          className="rounded-2xl border border-border bg-secondary/40 text-center"
          textClassName="text-primary"
          items={[
            { name: "Marie", position: "Élève", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=800&auto=format&fit=crop" },
            { name: "Paul", position: "Élève", image: "https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?q=80&w=800&auto=format&fit=crop" },
            { name: "Sophie", position: "Élève", image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=800&auto=format&fit=crop" },
            { name: "Paul", position: "Élève", image: "https://images.unsplash.com/photo-1582610285985-a42d9193f2fd?q=80&w=800&auto=format&fit=crop" },
            { name: "Sophie", position: "Élève", image: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218?q=80&w=800&auto=format&fit=crop" },
          ]}
        />
      </div>
    </div>
  )
}
