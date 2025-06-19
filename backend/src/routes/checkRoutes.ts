import { Router } from "express";

const router = Router();

router.get('/check', (req,res) => {
    res.json({
        status: 'OK',
        message: 'Check route is working',
    });
})

export default router