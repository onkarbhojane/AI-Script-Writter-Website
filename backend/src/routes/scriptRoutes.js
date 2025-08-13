// backend/src/routes/scriptRoutes.js
import express from "express";
import { generateScript, saveScript, getMyScripts } from "../controllers/scriptController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", authMiddleware, generateScript);
router.post("/save", authMiddleware, saveScript);
router.get("/my-scripts", authMiddleware, getMyScripts);

export default router;
