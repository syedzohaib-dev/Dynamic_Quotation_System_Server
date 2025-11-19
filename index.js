import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/connectDB.js";
import userRoutes from './src/routes/auth/userRoutes.js'
import quotationRoutes from './src/routes/quotation/quotationRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Middlewares
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://dynamic-quotation-system-client.vercel.app/',
            '*'
        ],
        credentials: true,
        methods: ['GET', "POST", "PUT", "DELETE"],
        allowedHeaders: ["content-type", "Authorization"],
    })
)
app.use(express.json());
app.use(cookieParser());

// Database Connect
connectDB();

// Basic Route  
app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/quotation", quotationRoutes);



// Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
