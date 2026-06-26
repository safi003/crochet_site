import { useLanguage } from "@/context/language-context"
import { courses } from "@/lib/data"
import ThreeDCarousel from "@/components/lightswind/3d-carousel"

export function CoursesPage() {
  const { t, lang } = useLanguage()

  const carouselItems = courses.map((course) => ({
    id: parseInt(course.id.replace("co", "")),
    title: course.title[lang],
    brand: course.level,
    description: course.description[lang],
    tags: [t.courses[course.level], `${course.durationHours}h`, `${course.lessons} ${t.courses.lessons}`],
    imageUrl: course.image,
    link: "#",
  }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="text-center mb-10">
        <h1 className="font-serif text-4xl font-semibold text-foreground">{t.courses.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.courses.subtitle}</p>
      </header>
      <ThreeDCarousel items={carouselItems} />
    </div>
  )
}
