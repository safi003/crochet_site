export type Bilingual = { fr: string; en: string }

export type Category = {
  id: string
  slug: string
  name: Bilingual
  description: Bilingual
  image: string
}

export type Product = {
  id: string
  name: Bilingual
  category: string
  price: number
  description: Bilingual
  image: string
  featured?: boolean
}

export type Course = {
  id: string
  title: Bilingual
  level: "beginner" | "intermediate" | "advanced"
  durationHours: number
  lessons: number
  price: number
  description: Bilingual
  image: string
}

export type GalleryItem = {
  id: string
  title: Bilingual
  image: string
}

export const categories: Category[] = [
  {
    id: "c1",
    slug: "sacs",
    name: { fr: "Sacs", en: "Bags" },
    description: {
      fr: "Sacs et pochettes au crochet, parfaits pour toutes les saisons.",
      en: "Crocheted bags and pouches, perfect for every season.",
    },
    image: "/products/bag-tote.png",
  },
  {
    id: "c2",
    slug: "porte-cles",
    name: { fr: "Porte-clés", en: "Keychains" },
    description: {
      fr: "Petits porte-clés tout doux à accrocher partout.",
      en: "Small, soft keychains to hang anywhere.",
    },
    image: "/products/keychain-heart.png",
  },
  {
    id: "c3",
    slug: "fleurs",
    name: { fr: "Fleurs", en: "Flowers" },
    description: {
      fr: "Bouquets et fleurs éternelles au crochet.",
      en: "Everlasting crocheted flowers and bouquets.",
    },
    image: "/products/flower-bouquet.png",
  },
  {
    id: "c4",
    slug: "amigurumi",
    name: { fr: "Amigurumis", en: "Amigurumi" },
    description: {
      fr: "Petites peluches et personnages crochetés à la main.",
      en: "Little hand-crocheted plushies and characters.",
    },
    image: "/products/amigurumi-bunny.png",
  },
  {
    id: "c5",
    slug: "deco",
    name: { fr: "Décoration", en: "Home decor" },
    description: {
      fr: "Napperons, suspensions et touches cosy pour la maison.",
      en: "Doilies, hangings and cozy touches for the home.",
    },
    image: "/products/decor-doily.png",
  },
  {
    id: "c6",
    slug: "accessoires",
    name: { fr: "Accessoires", en: "Accessories" },
    description: {
      fr: "Bonnets, écharpes et chouchous tout en douceur.",
      en: "Beanies, scarves and scrunchies, all soft.",
    },
    image: "/products/accessory-beanie.png",
  },
]

export const products: Product[] = [
  {
    id: "p1",
    name: { fr: "Sac cabas crème", en: "Cream tote bag" },
    category: "sacs",
    price: 45,
    description: {
      fr: "Grand sac cabas crocheté en coton, idéal pour le marché.",
      en: "Large cotton crocheted tote, perfect for the market.",
    },
    image: "/products/bag-tote.png",
    featured: true,
  },
  {
    id: "p2",
    name: { fr: "Pochette bandoulière", en: "Crossbody pouch" },
    category: "sacs",
    price: 32,
    description: {
      fr: "Petite pochette colorée avec bandoulière ajustable.",
      en: "Small colorful pouch with adjustable strap.",
    },
    image: "/products/bag-crossbody.png",
  },
  {
    id: "p3",
    name: { fr: "Porte-clés cœur", en: "Heart keychain" },
    category: "porte-cles",
    price: 9,
    description: {
      fr: "Porte-clés cœur tout doux, disponible en plusieurs couleurs.",
      en: "Soft heart keychain, available in several colors.",
    },
    image: "/products/keychain-heart.png",
    featured: true,
  },
  {
    id: "p4",
    name: { fr: "Porte-clés fleur", en: "Flower keychain" },
    category: "porte-cles",
    price: 10,
    description: {
      fr: "Petite fleur au crochet à accrocher à votre sac.",
      en: "Small crocheted flower to hang on your bag.",
    },
    image: "/products/keychain-flower.png",
  },
  {
    id: "p5",
    name: { fr: "Bouquet de tulipes", en: "Tulip bouquet" },
    category: "fleurs",
    price: 28,
    description: {
      fr: "Bouquet de tulipes éternelles, cinq tiges crochetées.",
      en: "Everlasting tulip bouquet, five crocheted stems.",
    },
    image: "/products/flower-bouquet.png",
    featured: true,
  },
  {
    id: "p6",
    name: { fr: "Rose unique", en: "Single rose" },
    category: "fleurs",
    price: 12,
    description: {
      fr: "Une rose au crochet sur sa tige, le cadeau qui ne fane jamais.",
      en: "A single crocheted rose on its stem, the gift that never fades.",
    },
    image: "/products/flower-rose.png",
  },
  {
    id: "p7",
    name: { fr: "Lapin amigurumi", en: "Bunny amigurumi" },
    category: "amigurumi",
    price: 35,
    description: {
      fr: "Adorable lapin tout doux, parfait pour les petits et grands.",
      en: "Adorable soft bunny, perfect for kids and adults alike.",
    },
    image: "/products/amigurumi-bunny.png",
    featured: true,
  },
  {
    id: "p8",
    name: { fr: "Ourson amigurumi", en: "Teddy amigurumi" },
    category: "amigurumi",
    price: 38,
    description: {
      fr: "Petit ourson câlin crocheté en fil doux.",
      en: "Little cuddly teddy crocheted in soft yarn.",
    },
    image: "/products/amigurumi-bear.png",
  },
  {
    id: "p9",
    name: { fr: "Napperon dentelle", en: "Lace doily" },
    category: "deco",
    price: 22,
    description: {
      fr: "Napperon en dentelle au crochet pour habiller votre table.",
      en: "Crocheted lace doily to dress up your table.",
    },
    image: "/products/decor-doily.png",
  },
  {
    id: "p10",
    name: { fr: "Suspension murale", en: "Wall hanging" },
    category: "deco",
    price: 40,
    description: {
      fr: "Suspension murale bohème au crochet avec franges.",
      en: "Boho crocheted wall hanging with fringes.",
    },
    image: "/products/decor-hanging.png",
    featured: true,
  },
  {
    id: "p11",
    name: { fr: "Bonnet douillet", en: "Cozy beanie" },
    category: "accessoires",
    price: 26,
    description: {
      fr: "Bonnet chaud et doux pour affronter l'hiver avec style.",
      en: "Warm and soft beanie to face winter in style.",
    },
    image: "/products/accessory-beanie.png",
  },
  {
    id: "p12",
    name: { fr: "Chouchous (lot de 3)", en: "Scrunchies (set of 3)" },
    category: "accessoires",
    price: 15,
    description: {
      fr: "Trois chouchous au crochet aux tons chauds.",
      en: "Three crocheted scrunchies in warm tones.",
    },
    image: "/products/accessory-scrunchies.png",
  },
]

export const courses: Course[] = [
  {
    id: "co1",
    title: { fr: "Le crochet pour débuter", en: "Crochet for beginners" },
    level: "beginner",
    durationHours: 4,
    lessons: 8,
    price: 49,
    description: {
      fr: "Apprenez à tenir le crochet, les mailles de base et votre premier projet.",
      en: "Learn how to hold the hook, the basic stitches and your first project.",
    },
    image: "/courses/course-beginner.png",
  },
  {
    id: "co2",
    title: { fr: "Créer ses amigurumis", en: "Make your own amigurumi" },
    level: "intermediate",
    durationHours: 6,
    lessons: 10,
    price: 69,
    description: {
      fr: "Maîtrisez le crochet en rond pour donner vie à de petites peluches.",
      en: "Master crocheting in the round to bring little plushies to life.",
    },
    image: "/courses/course-amigurumi.png",
  },
  {
    id: "co3",
    title: { fr: "Sacs & accessoires", en: "Bags & accessories" },
    level: "intermediate",
    durationHours: 5,
    lessons: 9,
    price: 59,
    description: {
      fr: "Crochetez des sacs solides et stylés, du cabas à la pochette.",
      en: "Crochet sturdy, stylish bags, from totes to pouches.",
    },
    image: "/courses/course-bags.png",
  },
  {
    id: "co4",
    title: { fr: "Fleurs & bouquets", en: "Flowers & bouquets" },
    level: "advanced",
    durationHours: 7,
    lessons: 12,
    price: 79,
    description: {
      fr: "Réalisez des fleurs réalistes et composez de magnifiques bouquets.",
      en: "Create realistic flowers and arrange beautiful bouquets.",
    },
    image: "/courses/course-flowers.png",
  },
]

export const galleryItems: GalleryItem[] = [
  { id: "g1", title: { fr: "Couverture granny", en: "Granny blanket" }, image: "/gallery/gallery-blanket.png" },
  { id: "g2", title: { fr: "Sac sur commande", en: "Custom bag" }, image: "/products/bag-tote.png" },
  { id: "g3", title: { fr: "Bouquet de mariée", en: "Bridal bouquet" }, image: "/gallery/gallery-bouquet.png" },
  { id: "g4", title: { fr: "Famille de lapins", en: "Bunny family" }, image: "/products/amigurumi-bunny.png" },
  { id: "g5", title: { fr: "Mobile bébé", en: "Baby mobile" }, image: "/gallery/gallery-mobile.png" },
  { id: "g6", title: { fr: "Suspension murale", en: "Wall hanging" }, image: "/products/decor-hanging.png" },
  { id: "g7", title: { fr: "Châle dentelle", en: "Lace shawl" }, image: "/gallery/gallery-shawl.png" },
  { id: "g8", title: { fr: "Coussin fleuri", en: "Floral cushion" }, image: "/gallery/gallery-cushion.png" },
]
