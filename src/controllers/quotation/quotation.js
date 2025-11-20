import { Quotation } from "../../models/quotation/Quotation.js";
import { ApiError } from "../../utils/apiError.js";
import { Apiresponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateInvoiceNumber } from "../../utils/generateInvoiceNumber.js";

export const createQuotation = asyncHandler(async (req, res) => {
    const { customerDetails, orderSources, products, priceSummary } = req.body;

    // Validate Step 1 fields
    if (!customerDetails || Object.keys(customerDetails).length === 0) {
        throw new ApiError(400, "Customer details are required");
    }

    // Validate Step 2 fields
    if (!orderSources || Object.keys(orderSources).length === 0) {
        throw new ApiError(400, "Order source details are required");
    }

    // Validate Step 3 fields
    if (!products || !Array.isArray(products) || products.length === 0) {
        throw new ApiError(400, "At least one product is required");
    }

    // Validate Step 4 fields
    if (!priceSummary || Object.keys(priceSummary).length === 0) {
        throw new ApiError(400, "Price summary is required");
    }

    const invoiceNumber = await generateInvoiceNumber(Quotation);
    orderSources.invoiceNumber = invoiceNumber;

    const userId = req.user.id;

    // Create Quotation
    const quotation = await Quotation.create({
        customerDetails,
        orderSources,
        products,
        priceSummary,
        createdBy: userId,
        // invoiceNumber
    });

    return res
        .status(201)
        .json(
            new Apiresponse(201, quotation, "Quotation created successfully")
        );
});

export const getAllQuotations = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    console.log(userId)
    if (!userId) {
        throw new ApiError(401, "Unauthorized user");
    }

    // Fetch all quotations created by this user
    const quotations = await Quotation.find({ createdBy: userId })
        .sort({ createdAt: -1 });
    console.log(quotations)
    return res
        .status(200)
        .json(
            new Apiresponse(200, quotations, "Quotations fetched successfully")
        );
});