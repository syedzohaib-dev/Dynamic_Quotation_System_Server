import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../models/auth/User.js";
import { ApiError } from "../../utils/apiError.js";
import { Apiresponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

// ---------------- REGISTER ----------------
export const signup = asyncHandler(async (req, res) => {
    const { name, email, companyName, password, confirmPassword, profileImageURL } = req.body;

    if (!name || !email || !companyName || !password || !confirmPassword) {
        throw new ApiError(400, "All fields are required");
    }

    if (password !== confirmPassword) {
        throw new ApiError(400, "Passwords do not match");
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(400, "User already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        companyName,
        password: hashedPassword,
        profileImageURL
    });

    return res
        .status(201)
        .json(new Apiresponse(201, user, "User registered successfully"));
});

// ---------------- LOGIN ----------------
export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "email and password required");
    }

    // Find user by company
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return res
        .status(200)
        .json(new Apiresponse(200, { user, token }, "Login successful"));
});

// ---------------- PROFILE ----------------
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res
        .status(200)
        .json(new Apiresponse(200, user, "Profile fetched successfully"));
});
