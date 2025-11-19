import express from "express";
import {
    createQuotation,
} from "../../controllers/quotation/quotation.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createQuotation);

export default router;
