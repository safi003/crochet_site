import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { Upload, Trash2, PenLine, X, Check } from "lucide-react"
import axios from "axios"

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

type GalleryImage = {
  _id: string
  filename: string
  url: string
  nameFr: string
  nameEn: string
  descriptionFr: string
  descriptionEn: string
  price: number
}

export function AdminPage() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    nameFr: "", nameEn: "",
    descriptionFr: "", descriptionEn: "",
    price: 0,
  })

  const [uploadNameFr, setUploadNameFr] = useState("")
  const [uploadNameEn, setUploadNameEn] = useState("")
  const [uploadDescFr, setUploadDescFr] = useState("")
  const [uploadDescEn, setUploadDescEn] = useState("")
  const [uploadPrice, setUploadPrice] = useState("")

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      navigate("/")
    }
  }, [user, loading, navigate])

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    api
      .get("/upload/gallery/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setImages(res.data))
      .catch(() => {})
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = fileRef.current?.files?.[0]
    if (!file) return

    const token = localStorage.getItem("token")
    if (!token) return

    const formData = new FormData()
    formData.append("image", file)
    formData.append("nameFr", uploadNameFr)
    formData.append("nameEn", uploadNameEn)
    formData.append("descriptionFr", uploadDescFr)
    formData.append("descriptionEn", uploadDescEn)
    formData.append("price", uploadPrice || "0")

    setUploading(true)
    setMessage("")
    try {
      await api.post("/upload/gallery", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      setMessage("Image ajoutée avec succès")
      const res = await api.get("/upload/gallery/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setImages(res.data)
      if (fileRef.current) fileRef.current.value = ""
      setUploadNameFr("")
      setUploadNameEn("")
      setUploadDescFr("")
      setUploadDescEn("")
      setUploadPrice("")
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erreur lors de l'upload")
    } finally {
      setUploading(false)
    }
  }

  const startEdit = (img: GalleryImage) => {
    setEditingId(img._id)
    setEditForm({
      nameFr: img.nameFr,
      nameEn: img.nameEn,
      descriptionFr: img.descriptionFr,
      descriptionEn: img.descriptionEn,
      price: img.price,
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const saveEdit = async (id: string) => {
    const token = localStorage.getItem("token")
    if (!token) return
    try {
      await api.put(`/upload/gallery/${id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, ...editForm } : img
        )
      )
      setEditingId(null)
    } catch {}
  }

  if (loading) return null

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-3xl font-semibold text-foreground">Administration</h1>
      <p className="mt-1 text-muted-foreground">Ajoutez des photos à la boutique avec description et prix</p>

      <form onSubmit={handleUpload} className="mt-8 rounded-lg border border-border bg-card p-6 space-y-4">
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-foreground">Image</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/gif,image/webp,image/svg+xml"
              required
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:opacity-90"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Upload className="size-4" />
            {uploading ? "..." : "Ajouter"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Nom (français)</label>
            <input
              value={uploadNameFr}
              onChange={(e) => setUploadNameFr(e.target.value)}
              placeholder="Nouvelle création"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Nom (anglais)</label>
            <input
              value={uploadNameEn}
              onChange={(e) => setUploadNameEn(e.target.value)}
              placeholder="New creation"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description (français)</label>
            <input
              value={uploadDescFr}
              onChange={(e) => setUploadDescFr(e.target.value)}
              placeholder="Ajoutée récemment"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description (anglais)</label>
            <input
              value={uploadDescEn}
              onChange={(e) => setUploadDescEn(e.target.value)}
              placeholder="Recently added"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Prix (€)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={uploadPrice}
              onChange={(e) => setUploadPrice(e.target.value)}
              placeholder="0"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {images.map((img) => (
          <div key={img._id} className="group relative overflow-hidden rounded-lg border border-border">
            <img
              src={img.url}
              alt={img.nameFr}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
              <p className="text-xs font-medium text-white truncate">
                {img.price > 0 ? `${img.price} €` : "Gratuit"}
              </p>
            </div>

            {editingId === img._id ? (
              <div className="absolute inset-0 flex flex-col gap-1 bg-background/95 p-2 overflow-auto">
                <input
                  value={editForm.nameFr}
                  onChange={(e) => setEditForm({ ...editForm, nameFr: e.target.value })}
                  placeholder="Nom FR"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
                <input
                  value={editForm.nameEn}
                  onChange={(e) => setEditForm({ ...editForm, nameEn: e.target.value })}
                  placeholder="Nom EN"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
                <input
                  value={editForm.descriptionFr}
                  onChange={(e) => setEditForm({ ...editForm, descriptionFr: e.target.value })}
                  placeholder="Description FR"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
                <input
                  value={editForm.descriptionEn}
                  onChange={(e) => setEditForm({ ...editForm, descriptionEn: e.target.value })}
                  placeholder="Description EN"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) || 0 })}
                  placeholder="Prix"
                  className="w-full rounded border px-2 py-1 text-xs"
                />
                <div className="flex gap-1 mt-1">
                  <button
                    onClick={() => saveEdit(img._id)}
                    className="flex-1 flex items-center justify-center gap-1 rounded bg-green-600 py-1 text-xs text-white hover:bg-green-700"
                  >
                    <Check className="size-3" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center justify-center rounded bg-destructive py-1 px-2 text-xs text-white hover:opacity-90"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => startEdit(img)}
                  className="flex size-8 items-center justify-center rounded-full bg-primary/90 text-white hover:bg-primary"
                  aria-label="Modifier"
                >
                  <PenLine className="size-4" />
                </button>
                <button
                  onClick={async () => {
                    const token = localStorage.getItem("token")
                    if (!token) return
                    try {
                      await api.delete(`/upload/gallery/${img._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      })
                      setImages((prev) => prev.filter((i) => i._id !== img._id))
                    } catch {}
                  }}
                  className="flex size-8 items-center justify-center rounded-full bg-destructive/90 text-white hover:bg-destructive"
                  aria-label="Supprimer"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="mt-8 text-center text-muted-foreground">
          Aucune image dans la galerie
        </p>
      )}
    </div>
  )
}
