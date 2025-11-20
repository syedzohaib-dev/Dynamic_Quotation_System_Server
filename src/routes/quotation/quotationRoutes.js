import express from "express";
import {
    createQuotation,
    getAllQuotations,
} from "../../controllers/quotation/quotation.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createQuotation);
router.get("/get-all", protect, getAllQuotations);



export default router;
