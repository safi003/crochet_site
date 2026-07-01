import { useLanguage } from "@/context/language-context"
import { galleryItems } from "@/lib/data"
import { ThreeDImageRing } from "@/components/lightswind/3d-image-ring"

export function GalleryPage() {
  const { t, lang } = useLanguage()

  const imageUrls = galleryItems.map((item) => item.image);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="font-serif text-4xl font-semibold text-foreground">{t.gallery.title}</h1>
        <p className="mt-2 text-muted-foreground">{t.gallery.subtitle}</p>
      </header>

      <ThreeDImageRing images={imageUrls}/>
    </div>
  )
}
