import { Router } from "express";
import { login, logout, createUser, setActiveStore } from "../controllers/authController"; 
import { verifyToken } from "../middleware/authMiddlewares";

const router = Router();

router.post("/login", login); 
router.get("/logout", logout);
router.post("/register", createUser);
router.post("/set-active-store", verifyToken, setActiveStore);
// router.post("/create-store", createStore);
// router.post("/create-superadmin", createSuperAdmin); 

router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token válido", user: req.user })
});

export default router;
