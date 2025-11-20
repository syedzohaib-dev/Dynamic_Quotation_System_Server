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
            specialNote: { type: String, default: "" }
        },

        orderSources: {
            invoiceNumber: { type: String, required: true },
            orderSources: { type: String, required: true },
            orderDate: { type: String, required: true },
            deliveryAddress: { type: String, required: true },
            city: { type: String, required: true },
            phoneNumber: { type: String, required: true },
            issueDate: { type: String, required: true },
            dueDate: { type: String, required: true },
            paymentMethod: { type: String, required: true },
            advance: { type: Number, default: "" },
            termsAndCondition: { type: String, default: "" }
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
