export const generateInvoiceNumber = async (Quotation) => {
    // Last created quotation find karo (latest)
    const lastQuotation = await Quotation.findOne().sort({ createdAt: -1 });

    // Agar koi quotation nahi hai → first invoice
    if (!lastQuotation) {
        return "INV-0001";
    }

    // Last invoice number se numeric part nikaal lo
    const lastInvoice = lastQuotation.orderSources.invoiceNumber; // Example: "INV-0007"
    const lastNumber = parseInt(lastInvoice.split("-")[1]);       // 7

    // Next invoice number
    const nextNumber = (lastNumber + 1).toString().padStart(4, "0"); // "0008"

    return `INV-${nextNumber}`;
};
