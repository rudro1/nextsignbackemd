const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  name: { type: String, default: "Untitled Document" },
  recipient: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  signaturePosition: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 }
  },
  status: { type: String, default: "Pending" },
  signedPdfUrl: { type: String, default: "" },
  linkExpiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);