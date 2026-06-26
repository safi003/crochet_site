import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { categories, products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"
import TextType from "../components/TextType"

export function HomePage() {
  const { t, lang } = useLanguage()
  const featured = products.filter((p) => p.featured)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:pt-24 mb-12">
          <TextType
            as="h1"
            text={t.home.heroTitle}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="w-full text-center font-serif text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl"
          />
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:pb-24">
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/boutique"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.common.explore} <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/cours"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t.common.seeCourses}
            </Link>
          </div>
        </div>
      </section>
    
      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 text-center">
          <h2 className="font-serif text-3xl font-semibold text-foreground">{t.home.categoriesTitle}</h2>
          <p className="mt-2 text-muted-foreground">{t.home.categoriesSubtitle}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/boutique?cat=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={cat.image || "/placeholder.svg"}
                alt={cat.name[lang]}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-serif text-lg font-semibold text-background">{cat.name[lang]}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">{t.home.featuredTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.home.featuredSubtitle}</p>
          </div>
          <Link to="/boutique" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">
            {t.common.viewAll} <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Courses CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-border bg-secondary/40 p-8 md:grid-cols-2 md:p-12">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-foreground">{t.home.coursesTitle}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t.home.coursesSubtitle}</p>
            <Link
              to="/cours"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t.common.seeCourses} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <img src="/courses/course-beginner.png" alt={t.home.coursesTitle} loading="lazy" className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-balance font-serif text-2xl italic leading-relaxed text-foreground sm:text-3xl">
          {t.home.quote}
        </p>
        <p className="mt-4 text-sm font-semibold text-primary">Lila — {t.common.brand}</p>
      </section>
    </div>
  )
}
