import { Router } from "express";
import { register, login, getMe, setRole } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/role", protect, admin, setRole);

export default router;
