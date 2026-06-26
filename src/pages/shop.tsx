import { useSearchParams } from "react-router-dom"
import { useLanguage } from "@/context/language-context"
import { categories, products } from "@/lib/data"
import OrbitImages from "@/components/OrbitImages"
import Stack from "@/components/Stack"
import { cn } from "@/lib/utils"

export function ShopPage() {
  const { t, lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCat = searchParams.get("cat") ?? "all"

  const filtered =
    activeCat === "all" ? products : products.filter((p) => p.category === activeCat)

  const setCat = (slug: string) => {
    if (slug === "all") {
      searchParams.delete("cat")
      setSearchParams(searchParams)
    } else {
      setSearchParams({ cat: slug })
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="text-center ">
        <h1 className="font-serif text-4xl font-semibold text-foreground">{t.shop.title}</h1>
        <p className="mt-2 text-muted-foreground mb-5">{t.shop.subtitle}</p>
      </header>

      {/* Category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-20">
        <button
          onClick={() => setCat("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCat === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:bg-muted",
          )}
        >
          {t.shop.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCat(cat.slug)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeCat === cat.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:bg-muted",
            )}
          >
            {cat.name[lang]}
          </button>
        ))}
      </div>

      {activeCat === "all" && (
        <div className="">
          <OrbitImages
            images={products.slice(0, 8).map((p) => p.image)}
            shape="ellipse"
            duration={50}
            itemSize={80}
            radiusX={340}
            radiusY={80}
            radius={160}
            rotation={-8}
            fill
            direction="normal"
            showPath
            responsive
            height={200}
            altPrefix={t.shop.title}
          />
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">{t.shop.empty}</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-15">
          {filtered.map((p) => (
            <div key={p.id} className="relative flex flex-col items-center">
              <span className="absolute top-3 z-10 rounded-full bg-green-900 px-3 py-1 text-xs font-semibold text-white">
                {p.price} €
              </span>
              <div className="w-full aspect-square">
                <Stack
                  sendToBackOnClick
                  cards={[
                    <div className="w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name[lang]}
                        className="w-full h-full object-cover"
                      />
                    </div>,
                  ]}
                />
              </div>
              <h3 className="mt-3 text-sm font-medium text-center">{p.name[lang]}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
