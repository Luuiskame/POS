import { Router } from "express";
import { createStore, assignUserToStoreController } from "../controllers/storeControllers/storeController";
import { verifyToken } from "../middleware/authMiddlewares";
import { restrictTo } from "../middleware/restrictedTo";

const router = Router();

router.post("/create-store",verifyToken, createStore)
router.post("/assign-user-to-store", verifyToken, restrictTo('admin', 'superadmin'), assignUserToStoreController);

export default router;