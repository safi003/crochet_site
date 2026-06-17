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
    <div className="mt-6">
      <ThreeDCarousel
      items={carouselItems}
      title={t.courses.title}
      subtitle={t.courses.subtitle}
    />
    </div>
  )
}
