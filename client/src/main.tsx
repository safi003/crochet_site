import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { LanguageProvider } from "./context/language-context"
import { CartProvider } from "./context/cart-context"
import { AuthProvider } from "./context/auth-context"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
