import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    profileImageURL: {
        type: String,
        default: ""
    },

    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
