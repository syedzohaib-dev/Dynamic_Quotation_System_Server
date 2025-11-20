import express from "express";
import {
    signup,
    login,
    getUserProfile,
    getAllUsers
} from "../../controllers/auth/authController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get-user", protect, getUserProfile); 
router.get("/get-all-users", getAllUsers);


export default router;
