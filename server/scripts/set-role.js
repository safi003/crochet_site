// Usage: node scripts/set-role.js <email> <role>
// Example: node scripts/set-role.js safiadiaraye03@gmail.com admin

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const email = process.argv[2];
const role = process.argv[3];

if (!email || !role) {
  console.error("Usage: node scripts/set-role.js <email> <role>");
  console.error("Roles: user, admin");
  process.exit(1);
}

if (!["user", "admin"].includes(role)) {
  console.error("Rôle invalide. Utilisez 'user' ou 'admin'.");
  process.exit(1);
}

const User = (await import("../models/User.js")).default;

try {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email });
  if (!user) {
    console.error("Utilisateur introuvable :", email);
    process.exit(1);
  }
  user.role = role;
  await user.save();
  console.log(`Rôle de ${user.name} (${email}) mis à jour : ${role}`);
  process.exit(0);
} catch (err) {
  console.error("Erreur :", err.message);
  process.exit(1);
}
