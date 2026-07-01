import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    nameFr: { type: String, default: "Nouvelle création" },
    nameEn: { type: String, default: "New creation" },
    descriptionFr: { type: String, default: "Ajoutée récemment" },
    descriptionEn: { type: String, default: "Recently added" },
    price: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
