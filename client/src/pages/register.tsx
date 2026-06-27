import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/auth-context"
import { useLanguage } from "@/context/language-context"

export function RegisterPage() {
  const { t } = useLanguage()
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await register(name, email, password)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur d'inscription")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md items-center px-4 py-16">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold">{t.auth.register}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t.auth.registerSubtitle}</p>
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">{error}</p>
        )}

        <div>
          <label className="mb-1 block text-sm font-medium">{t.contact.name}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t.contact.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">{t.auth.password}</label>
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {submitting ? "..." : t.auth.register}
        </button>

        <p className="text-center text-sm text-muted-foreground">
          {t.auth.hasAccount}{" "}
          <Link to="/connexion" className="font-medium text-primary hover:underline">
            {t.auth.login}
          </Link>
        </p>
      </form>
    </div>
  )
}
