import { Router } from "express";
import { createStore, getStore } from "../controllers/authController"; 

const router = Router();

// console.log(typeof createStore); // ✅ Esto ahora funciona

// router.post("/create-store"); // ✅ Esto ahora funciona
router.post("/create-store", getStore);

export default router;
