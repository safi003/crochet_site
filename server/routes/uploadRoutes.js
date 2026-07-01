import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { protect } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";
import Image from "../models/Image.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryPath = path.resolve(__dirname, "../../client/public/gallery");

if (!fs.existsSync(galleryPath)) {
  fs.mkdirSync(galleryPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, galleryPath),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `gallery-${unique}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = /\.(png|jpe?g|gif|webp|svg)$/i;
  if (allowed.test(path.extname(file.originalname))) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers image sont autorisés (png, jpg, gif, webp, svg)"));
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

const router = Router();

router.post("/gallery", protect, admin, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Aucun fichier fourni" });
  }
  try {
    const img = await Image.create({
      filename: req.file.filename,
      url: `/gallery/${req.file.filename}`,
      user: req.user._id,
      nameFr: req.body.nameFr || "Nouvelle création",
      nameEn: req.body.nameEn || "New creation",
      descriptionFr: req.body.descriptionFr || "Ajoutée récemment",
      descriptionEn: req.body.descriptionEn || "Recently added",
      price: parseFloat(req.body.price) || 0,
    });
    res.json({
      message: "Image ajoutée avec succès",
      image: img.url,
      _id: img._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/gallery", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/gallery/my", protect, admin, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/gallery/:id", protect, admin, async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) {
      return res.status(404).json({ message: "Image introuvable" });
    }
    if (img.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Vous ne pouvez modifier que vos propres images" });
    }

    if (req.body.nameFr !== undefined) img.nameFr = req.body.nameFr;
    if (req.body.nameEn !== undefined) img.nameEn = req.body.nameEn;
    if (req.body.descriptionFr !== undefined) img.descriptionFr = req.body.descriptionFr;
    if (req.body.descriptionEn !== undefined) img.descriptionEn = req.body.descriptionEn;
    if (req.body.price !== undefined) img.price = parseFloat(req.body.price);

    await img.save();
    res.json({ message: "Image mise à jour avec succès", image: img });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.delete("/gallery/:id", protect, admin, async (req, res) => {
  try {
    const img = await Image.findById(req.params.id);
    if (!img) {
      return res.status(404).json({ message: "Image introuvable" });
    }
    if (img.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Vous ne pouvez supprimer que vos propres images" });
    }
    const filePath = path.join(galleryPath, img.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: "Image supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
