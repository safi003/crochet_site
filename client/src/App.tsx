import { Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"
import { HomePage } from "@/pages/home"
import { ShopPage } from "@/pages/shop"
import { ProductPage } from "@/pages/product"
import { CoursesPage } from "@/pages/courses"
import { GalleryPage } from "@/pages/gallery"
import { AboutPage } from "@/pages/about"
import { ContactPage } from "@/pages/contact"
import { LoginPage } from "@/pages/login"
import { RegisterPage } from "@/pages/register"
import { NotFoundPage } from "@/pages/not-found"
import { Loader } from "@/components/loader"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Loader />
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/boutique" element={<ShopPage />} />
          <Route path="/boutique/:id" element={<ProductPage />} />
          <Route path="/cours" element={<CoursesPage />} />
          <Route path="/galerie" element={<GalleryPage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/inscription" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
