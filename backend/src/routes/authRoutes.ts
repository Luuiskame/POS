import { Router } from "express";
import { createStore, login, logout } from "../controllers/authController"; 
import { verifyToken } from "../middleware/authMiddlewares";

const router = Router();

router.post("/create-store", createStore);
router.post("/login", login); 
router.get("/logout", logout);

router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token válido", user: req.user })
});

export default router;
