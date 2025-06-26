import { Router } from "express";
import { associateUserToStore } from "../controllers/adminControllers/userRelated";

const router = Router();

router.post('/add-user-to-store', associateUserToStore)

export default router;