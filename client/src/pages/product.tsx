import { useParams, Link, useNavigate } from "react-router-dom"
import { useLanguage } from "@/context/language-context"
import { useAuth } from "@/context/auth-context"
import { products, categories } from "@/lib/data"
import { useCart } from "@/context/cart-context"
import { Plus, Check, ArrowLeft, Pencil, Trash2, X, Save } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import type { Product } from "@/lib/data"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { t, lang } = useLanguage()
  const { user } = useAuth()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const [added, setAdded] = useState(false)
  const [galleryProducts, setGalleryProducts] = useState<Product[]>([])
  const [rawItem, setRawItem] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    nameFr: "", nameEn: "",
    descriptionFr: "", descriptionEn: "",
    price: 0,
  })

  useEffect(() => {
    if (id?.startsWith("gallery-")) {
      api.get("/upload/gallery").then((res) => {
        const raw = res.data.find((img: any) => `gallery-upload-${img._id}` === id)
        setRawItem(raw)
        const imgs: Product[] = res.data.map((img: any) => ({
          id: `gallery-upload-${img._id}`,
          name: { fr: img.nameFr || "Nouvelle création", en: img.nameEn || "New creation" },
          category: "galerie",
          price: img.price ?? 0,
          description: { fr: img.descriptionFr || "Ajoutée récemment", en: img.descriptionEn || "Recently added" },
          image: img.url,
        }))
        setGalleryProducts(imgs)
        if (raw) {
          setEditForm({
            nameFr: raw.nameFr || "",
            nameEn: raw.nameEn || "",
            descriptionFr: raw.descriptionFr || "",
            descriptionEn: raw.descriptionEn || "",
            price: raw.price ?? 0,
          })
        }
      }).catch(() => {})
    }
  }, [id])

  const product = products.find((p) => p.id === id) || galleryProducts.find((p) => p.id === id)
  const category = product ? categories.find((c) => c.slug === product.category) : undefined
  const isGallery = id?.startsWith("gallery-")
  const isAdmin = user?.role === "admin"

  const handleAdd = () => {
    if (!product) return
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleSave = async () => {
    const token = localStorage.getItem("token")
    if (!token || !rawItem) return
    try {
      const { data } = await api.put(`/upload/gallery/${rawItem._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRawItem(data.image)
      setEditing(false)
    } catch {}
  }

  const handleDelete = async () => {
    const token = localStorage.getItem("token")
    if (!token || !rawItem) return
    if (!window.confirm("Supprimer cet article ?")) return
    try {
      await api.delete(`/upload/gallery/${rawItem._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      navigate("/boutique")
    } catch {}
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="text-muted-foreground">{t.shop.productNotFound}</p>
        <Link
          to="/boutique"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="size-4" />
          {t.shop.back}
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Link
        to="/boutique"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        {t.shop.back}
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="group relative aspect-square overflow-hidden rounded-3xl bg-secondary/50">
          <img
            src={product.image}
            alt={product.name[lang]}
            loading="lazy"
            className="size-full object-cover"
          />
          {product.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              {t.common.handmade}
            </span>
          )}
          {isAdmin && isGallery && !editing && (
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() => setEditing(true)}
                className="flex size-10 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
                aria-label="Modifier"
              >
                <Pencil className="size-4" />
              </button>
              <button
                onClick={handleDelete}
                className="flex size-10 items-center justify-center rounded-full bg-destructive text-white shadow-lg hover:bg-destructive/90"
                aria-label="Supprimer"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {category && (
            <Link
              to={`/boutique?cat=${category.slug}`}
              className="mb-2 text-xs font-medium uppercase tracking-wider text-primary hover:underline"
            >
              {category.name[lang]}
            </Link>
          )}

          {editing ? (
            <div className="space-y-3">
              <input
                value={editForm.nameFr}
                onChange={(e) => setEditForm({ ...editForm, nameFr: e.target.value })}
                placeholder="Nom (français)"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-lg font-semibold"
              />
              <input
                value={editForm.nameEn}
                onChange={(e) => setEditForm({ ...editForm, nameEn: e.target.value })}
                placeholder="Nom (anglais)"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-2xl font-semibold"
              />
              <textarea
                value={editForm.descriptionFr}
                onChange={(e) => setEditForm({ ...editForm, descriptionFr: e.target.value })}
                placeholder="Description (français)"
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <textarea
                value={editForm.descriptionEn}
                onChange={(e) => setEditForm({ ...editForm, descriptionEn: e.target.value })}
                placeholder="Description (anglais)"
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <Save className="size-4" />
                  Enregistrer
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-2 rounded-full bg-destructive px-6 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  <X className="size-4" />
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-3xl font-semibold text-foreground sm:text-4xl">
                {product.name[lang]}
              </h1>
              <p className="mt-2 text-2xl font-semibold text-foreground">
                {product.price} €
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {product.description[lang]}
              </p>
              <div className="mt-8">
                <button
                  onClick={handleAdd}
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {added ? <Check className="size-4" /> : <Plus className="size-4" />}
                  {added ? t.common.added : t.common.addToCart}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
