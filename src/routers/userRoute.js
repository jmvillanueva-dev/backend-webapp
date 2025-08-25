import { Router } from "express";
import { registerUser, loginUser, confirmUser } from "../controllers/userController.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/confirm/:token", confirmUser);

export default router;
