const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Document = require("../models/Document");
const cloudinary = require("cloudinary").v2;
const { PDFDocument } = require("pdf-lib");
const axios = require("axios");

const uploadFromBuffer = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: "auto", folder: "fixensysign" }, (err, res) => {
      if (res) resolve(res); else reject(err);
    });
    stream.end(fileBuffer);
  });
};

// Create Document
router.post("/", upload.single("pdf"), async (req, res) => {
  try {
    const result = await uploadFromBuffer(req.file.buffer);
    const boxPos = JSON.parse(req.body.boxPosition);
    const newDoc = new Document({
      name: req.body.name,
      recipient: req.body.recipient,
      pdfUrl: result.secure_url,
      signaturePosition: boxPos,
      linkExpiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000)
    });
    await newDoc.save();
    res.json({ success: true, id: newDoc._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get All
router.get("/", async (req, res) => {
  const docs = await Document.find().sort({ createdAt: -1 });
  res.json(docs);
});

// Get One
router.get("/:id", async (req, res) => {
  const doc = await Document.findById(req.params.id);
  res.json(doc);
});

// SIGN PDF LOGIC
router.post("/sign/:id", async (req, res) => {
  try {
    const { signatureImageBase64 } = req.body;
    const doc = await Document.findById(req.params.id);
    
    // Fetch PDF
    const response = await axios.get(doc.pdfUrl, { responseType: 'arraybuffer' });
    const pdfDoc = await PDFDocument.load(response.data);
    const firstPage = pdfDoc.getPages()[0];
    const { height } = firstPage.getSize();

    // Embed Sig
    const sigImg = await pdfDoc.embedPng(signatureImageBase64);
    firstPage.drawImage(sigImg, {
      x: doc.signaturePosition.x,
      y: height - doc.signaturePosition.y - 50,
      width: 150, height: 50
    });

    const signedBytes = await pdfDoc.save();
    const result = await uploadFromBuffer(Buffer.from(signedBytes));

    doc.status = "Signed";
    doc.signedPdfUrl = result.secure_url;
    await doc.save();
    res.json({ success: true, url: result.secure_url });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;