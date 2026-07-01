import { useSearchParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/language-context";
import { categories, products } from "@/lib/data";
import OrbitImages from "@/components/OrbitImages";
import Stack from "@/components/Stack";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Plus, Check, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "@/lib/data";

const api = axios.create({ baseURL: "http://localhost:5000/api" })

export function ShopPage() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") ?? "all";
  const [galleryProductImages, setGalleryProductImages] = useState<Product[]>([])

  useEffect(() => {
    api
      .get("/upload/gallery")
      .then((res) => {
        const imgs: Product[] = res.data.map((img: any, i: number) => ({
          id: `gallery-upload-${img._id || i}`,
          name: { fr: img.nameFr || "Nouvelle création", en: img.nameEn || "New creation" },
          category: "galerie",
          price: img.price ?? 0,
          description: { fr: img.descriptionFr || "Ajoutée récemment", en: img.descriptionEn || "Recently added" },
          image: img.url,
        }))
        setGalleryProductImages(imgs)
      })
      .catch(() => {})
  }, [])

  const allProducts = [...products, ...galleryProductImages]

  const filtered =
    activeCat === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === activeCat);

  const setCat = (slug: string) => {
    if (slug === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ cat: slug });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="text-center ">
        <h1 className="font-serif text-4xl font-semibold text-foreground">
          {t.shop.title}
        </h1>
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
        <button
          onClick={() => setCat("galerie")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            activeCat === "galerie"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:bg-muted",
          )}
        >
          Galerie
        </button>
      </div>

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

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          {t.shop.empty}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 mt-15">
          {filtered.map((p) => (
            <ShopProductCard key={p.id} product={p} lang={lang} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function ShopProductCard({
  product,
  lang,
  t,
}: {
  product: (typeof products)[number];
  lang: string;
  t: any;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="relative flex flex-col items-center border rounded-2xl border-border bg-background p-4 transition-shadow hover:shadow-lg">
      {product.price > 0 ? (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-green-900 px-3 py-1 text-xs font-semibold text-white">
          {product.price} €
        </span>
      ) : (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
          Nouveau
        </span>
      )}
      <Link to={`/boutique/${product.id}`} className="w-full aspect-square">
        <Stack
          sendToBackOnClick
          cards={[
            <div className="w-full h-full rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name[lang]}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>,
          ]}
        />
      </Link>
      <h3 className="mt-3 text-sm font-medium text-center">
        {product.name[lang]}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground text-center line-clamp-2">
        {product.description[lang]}
      </p>
      {product.price > 0 && (
        <div className="mt-3 flex items-center gap-2 w-full px-2">
          <button
            onClick={handleAdd}
            className="flex-1 flex items-center justify-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {added ? (
              <Check className="size-3.5" />
            ) : (
              <Plus className="size-3.5" />
            )}
            {added ? t.common.added : t.common.addToCart}
          </button>
        </div>
      )}
    </div>
  );
}
