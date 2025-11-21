import express from "express";
import {
    createQuotation,
    getAllQuotations,
    getQuotationById,
} from "../../controllers/quotation/quotation.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createQuotation);
router.get("/get-all", protect, getAllQuotations);
router.get("/:id", protect, getQuotationById);




export default router;
