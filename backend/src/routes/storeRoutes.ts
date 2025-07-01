import { Router } from "express";
import { createStore, assignUserToStoreController } from "../controllers/storeControllers/storeController";

const router = Router();

router.post("/create-store", createStore)
router.post("/assign-user-to-store", assignUserToStoreController);

export default router;