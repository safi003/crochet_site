# Atelier Lila — Full-Stack Crochet Project

Application e-commerce bilingue (FR/EN) pour une boutique de crochet artisanal.

## Structure

```
├── client/     # Frontend React
└── server/     # Backend Node.js / Express
```

---

## Client

**Frontend** — React 19, TypeScript, Vite 8, Tailwind CSS v4, shadcn/ui.

### Scripts

```bash
cd client
npm install
npm run dev      # Serveur de développement → http://localhost:5173
npm run build    # Build production
npm run preview  # Preview production
```

### Pages

| Route             | Page            |
| ----------------- | --------------- |
| `/`               | Accueil         |
| `/boutique`       | Boutique        |
| `/boutique/:id`   | Détail produit  |
| `/cours`          | Cours           |
| `/galerie`        | Galerie         |
| `/a-propos`       | À propos        |
| `/contact`        | Contact         |

---

## Server

**Backend** — Node.js, Express 5, MongoDB (Mongoose 9).

### Scripts

```bash
cd server
npm install
npm run start     # Démarre le serveur
```

### Configuration

Créer un fichier `.env` dans `server/` :

```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/
PORT=5000
JWT_SECRET=<votre_secret>
CLIENT_URL=http://localhost:5173
```

---

## Stack technique

| Couche    | Technologie                           |
| --------- | ------------------------------------- |
| Frontend  | React 19, TypeScript, Vite 8, Tailwind CSS v4, shadcn/ui |
| Backend   | Node.js, Express 5, Mongoose 9        |
| Base      | MongoDB                               |
| Animations | Framer Motion, GSAP, lightswind      |
| Routing   | react-router-dom v7                   |
| I18n      | Contexte React personnalisé (FR/EN)   |
