import { Router } from "express";
import { createStore, assignUserToStoreController } from "../controllers/storeControllers/storeController";
import { verifyToken } from "../middleware/authMiddlewares";

const router = Router();

router.post("/create-store",verifyToken, createStore)
router.post("/assign-user-to-store", verifyToken, assignUserToStoreController);

export default router;