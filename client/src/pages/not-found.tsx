import { Link } from "react-router-dom"
import { useLanguage } from "@/context/language-context"
import { ArrowLeft } from "lucide-react"

export function NotFoundPage() {
  const { lang } = useLanguage()

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <h1 className="font-serif text-8xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        {lang === "fr" ? "Page introuvable" : "Page not found"}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {lang === "fr"
          ? "La page que vous cherchez n'existe pas ou a été déplacée."
          : "The page you're looking for doesn't exist or has been moved."}
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="size-4" />
        {lang === "fr" ? "Retour à l'accueil" : "Back to home"}
      </Link>
    </div>
  )
}
