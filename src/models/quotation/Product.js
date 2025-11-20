import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    category: { type: String, required: true },
    unitMeasure: { type: String, required: true },  
    quantity: { type: Number, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    discountApplied: { type: Number, required: true, default: 0 },
    taxApplied: { type: Number, required: true, default: 0 },
});

export default productSchema;
