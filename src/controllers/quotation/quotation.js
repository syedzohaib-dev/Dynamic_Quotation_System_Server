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


    // Create Quotation
    const quotation = await Quotation.create({
        customerDetails,
        orderSources,
        products,
        priceSummary,
        createdBy: req.user.id
    });

    return res
        .status(201)
        .json(
            new Apiresponse(201, quotation, "Quotation created successfully")
        );
});
