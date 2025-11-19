import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import userRoutes from "./src/routes/auth/userRoutes.js";
import quotationRoutes from "./src/routes/quotation/quotationRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json());
app.use(cookieParser());
connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/quotation", quotationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
