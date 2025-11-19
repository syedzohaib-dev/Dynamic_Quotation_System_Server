import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    unitPrice: { type: Number, required: true },
    discountPercent: { type: Number, required: true, default: 0 },
    taxPercent: { type: Number, required: true, default: 0 },
    subtotal: { type: Number, required: true }
});

export default productSchema;
