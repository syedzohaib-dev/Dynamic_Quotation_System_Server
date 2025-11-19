import mongoose from "mongoose";
import productSchema from "./Product.js";

const quotationSchema = new mongoose.Schema(
    {
        customerDetails: {
            customerName: { type: String, required: true },
            companyName: { type: String, required: true },
            deliveryAddress: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
            email: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            specialInstruction: { type: String, default: "" }
        },

        orderSources: {
            invoiceNumber: { type: String, required: true },
            dateIssued: { type: String, required: true },
            dueDate: { type: String, required: true },
            projectDescription: { type: String, required: true },
            paymentType: { type: String, required: true },
            bankName: { type: String, default: "" },
            accountNumber: { type: String, default: "" }
        },

        products: {
            type: [productSchema],
            required: true
        },

        priceSummary: {
            subTotal: { type: Number, required: true },
            totalDiscountApplied: { type: Number, required: true },
            totalTaxApplied: { type: Number, required: true },
            grandTotal: { type: Number, required: true },
            termsAndConditions: { type: String, required: true }
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected", "revised"],
            default: "pending"
        }
    },
    { timestamps: true }
);

export const Quotation = mongoose.model("Quotation", quotationSchema);
