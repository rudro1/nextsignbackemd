// // // // // // const express = require('express');
// // // // // // const mongoose = require('mongoose');
// // // // // // const multer = require('multer');
// // // // // // const cors = require('cors');
// // // // // // const axios = require('axios');
// // // // // // const { PDFDocument } = require('pdf-lib');
// // // // // // const cloudinary = require('cloudinary').v2;

// // // // // // const app = express();
// // // // // // app.use(cors());
// // // // // // app.use(express.json({ limit: '50mb' }));

// // // // // // cloudinary.config({ 
// // // // // //   cloud_name: 'dxbpamnhh', 
// // // // // //   api_key: '571393811393974', 
// // // // // //   api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' 
// // // // // // });

// // // // // // const upload = multer({ storage: multer.memoryStorage() });

// // // // // // const documentSchema = new mongoose.Schema({
// // // // // //   pdfPath: String,
// // // // // //   signedPdf: String, 
// // // // // //   signs: Array, 
// // // // // //   name: String,
// // // // // //   signerEmail: String,
// // // // // //   status: { type: String, default: 'Pending' },
// // // // // //   expireAt: { type: Date, default: null } 
// // // // // // }, { timestamps: true });

// // // // // // const Document = mongoose.model('Document', documentSchema);

// // // // // // mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority")
// // // // // //   .then(() => console.log("✅ DB Connected"))
// // // // // //   .catch(err => console.error(err));

// // // // // // // 🚀 FAST DASHBOARD: Skip heavy binary data for the list
// // // // // // app.get('/api/documents', async (req, res) => {
// // // // // //     try {
// // // // // //         const docs = await Document.find()
// // // // // //             .select('name status createdAt pdfPath signerEmail') 
// // // // // //             .sort({ createdAt: -1 })
// // // // // //             .lean();
// // // // // //         res.status(200).json(docs);
// // // // // //     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// // // // // // });

// // // // // // // 📥 SPECIFIC DATA: Load heavy data ONLY when clicked
// // // // // // app.get('/api/documents/download/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         const doc = await Document.findById(req.params.id).select('signedPdf pdfPath');
// // // // // //         res.json({ pdf: doc.signedPdf || doc.pdfPath });
// // // // // //     } catch (e) { res.status(500).json({ error: "Error" }); }
// // // // // // });

// // // // // // // ✍️ SIGNING PAGE DATA
// // // // // // app.get('/api/doc/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         const doc = await Document.findById(req.params.id);
// // // // // //         res.json(doc);
// // // // // //     } catch (e) { res.status(404).json({ error: "Not found" }); }
// // // // // // });

// // // // // // // ✍️ SUBMIT SIGN
// // // // // // app.post('/api/submit-sign/:id', async (req, res) => {
// // // // // //     try {
// // // // // //         const { signaturesMap, email } = req.body;
// // // // // //         const doc = await Document.findById(req.params.id);
// // // // // //         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
// // // // // //         const pdfDoc = await PDFDocument.load(pdfBytes);
// // // // // //         for (const sig of doc.signs) {
// // // // // //             const sigImg = await pdfDoc.embedPng(signaturesMap[sig.id || sig._id]);
// // // // // //             const page = pdfDoc.getPages()[sig.page - 1];
// // // // // //             page.drawImage(sigImg, { x: sig.x, y: page.getSize().height - sig.y - 50, width: 150, height: 50 });
// // // // // //         }
// // // // // //         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
// // // // // //         doc.signedPdf = pdfBase64; doc.status = 'Signed'; doc.signerEmail = email;
// // // // // //         await doc.save();
// // // // // //         res.json({ pdf: pdfBase64 });
// // // // // //     } catch (e) { res.status(500).json({ error: "Signing failed" }); }
// // // // // // });

// // // // // // // 📤 UPLOAD & GENERATE
// // // // // // app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
// // // // // //     try {
// // // // // //         const b64 = Buffer.from(req.file.buffer).toString("base64");
// // // // // //         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
// // // // // //         res.json({ pdfPath: cldRes.secure_url });
// // // // // //     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// // // // // // });

// // // // // // app.post('/api/generate-link', async (req, res) => {
// // // // // //     try {
// // // // // //         const newDoc = new Document(req.body);
// // // // // //         await newDoc.save();
// // // // // //         res.json({ id: newDoc._id });
// // // // // //     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// // // // // // });

// // // // // // app.listen(5011, '0.0.0.0', () => console.log(`🚀 Fast Server 5011`));


// // // // // const express = require('express');
// // // // // const mongoose = require('mongoose');
// // // // // const multer = require('multer');
// // // // // const cors = require('cors');
// // // // // const axios = require('axios');
// // // // // const { PDFDocument } = require('pdf-lib');
// // // // // const cloudinary = require('cloudinary').v2;

// // // // // const app = express();
// // // // // app.use(cors());
// // // // // app.use(express.json({ limit: '50mb' }));

// // // // // cloudinary.config({ 
// // // // //   cloud_name: 'dxbpamnhh', 
// // // // //   api_key: '571393811393974', 
// // // // //   api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' 
// // // // // });

// // // // // const upload = multer({ storage: multer.memoryStorage() });

// // // // // const documentSchema = new mongoose.Schema({
// // // // //   pdfPath: String,
// // // // //   signedPdf: String, 
// // // // //   signs: Array, 
// // // // //   name: String,
// // // // //   signerEmail: String,
// // // // //   status: { type: String, default: 'Pending' },
// // // // //   expireAt: { type: Date, default: null } 
// // // // // }, { timestamps: true });

// // // // // const Document = mongoose.model('Document', documentSchema);

// // // // // mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority")
// // // // //   .then(() => console.log("✅ DB Connected"))
// // // // //   .catch(err => console.error(err));

// // // // // // 🚀 ULTRA FAST DASHBOARD: Skip all heavy fields
// // // // // app.get('/api/documents', async (req, res) => {
// // // // //     try {
// // // // //         const docs = await Document.find()
// // // // //             .select('name status createdAt pdfPath signerEmail') // Shudhu table metadata
// // // // //             .sort({ createdAt: -1 })
// // // // //             .lean();
// // // // //         res.status(200).json(docs);
// // // // //     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// // // // // });

// // // // // // 📥 SPECIFIC DATA: Load heavy PDF only on-demand
// // // // // app.get('/api/documents/download/:id', async (req, res) => {
// // // // //     try {
// // // // //         const doc = await Document.findById(req.params.id).select('signedPdf pdfPath');
// // // // //         res.json({ pdf: doc.signedPdf || doc.pdfPath });
// // // // //     } catch (e) { res.status(500).json({ error: "Error" }); }
// // // // // });

// // // // // // ✍️ SIGNING PAGE API
// // // // // app.get('/api/doc/:id', async (req, res) => {
// // // // //     try {
// // // // //         const doc = await Document.findById(req.params.id);
// // // // //         res.json(doc);
// // // // //     } catch (e) { res.status(404).json({ error: "Not found" }); }
// // // // // });

// // // // // // ✍️ SUBMIT SIGN ROUTE
// // // // // app.post('/api/submit-sign/:id', async (req, res) => {
// // // // //     try {
// // // // //         const { signaturesMap, email } = req.body;
// // // // //         const doc = await Document.findById(req.params.id);
// // // // //         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
// // // // //         const pdfDoc = await PDFDocument.load(pdfBytes);
        
// // // // //         for (const sig of doc.signs) {
// // // // //             const sigImg = await pdfDoc.embedPng(signaturesMap[sig.id || sig._id]);
// // // // //             const page = pdfDoc.getPages()[sig.page - 1];
// // // // //             page.drawImage(sigImg, { 
// // // // //               x: sig.x, 
// // // // //               y: page.getSize().height - sig.y - 50, 
// // // // //               width: 150, 
// // // // //               height: 50 
// // // // //             });
// // // // //         }
        
// // // // //         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
// // // // //         doc.signedPdf = pdfBase64; 
// // // // //         doc.status = 'Signed'; 
// // // // //         doc.signerEmail = email;
// // // // //         await doc.save();
// // // // //         res.json({ pdf: pdfBase64 });
// // // // //     } catch (e) { res.status(500).json({ error: "Signing failed" }); }
// // // // // });

// // // // // // 📤 UPLOAD ROUTE
// // // // // app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
// // // // //     try {
// // // // //         const b64 = Buffer.from(req.file.buffer).toString("base64");
// // // // //         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
// // // // //         res.json({ pdfPath: cldRes.secure_url });
// // // // //     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// // // // // });

// // // // // app.post('/api/generate-link', async (req, res) => {
// // // // //     try {
// // // // //         const newDoc = new Document(req.body);
// // // // //         await newDoc.save();
// // // // //         res.json({ id: newDoc._id });
// // // // //     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// // // // // });

// // // // // app.listen(5011, '0.0.0.0', () => console.log(`🚀 Fast Server running on 5011`));

// // // // const express = require('express');
// // // // const mongoose = require('mongoose');
// // // // const multer = require('multer');
// // // // const cors = require('cors');
// // // // const axios = require('axios');
// // // // const { PDFDocument } = require('pdf-lib');
// // // // const cloudinary = require('cloudinary').v2;

// // // // const app = express();
// // // // app.use(cors());
// // // // app.use(express.json({ limit: '50mb' }));

// // // // cloudinary.config({ 
// // // //   cloud_name: 'dxbpamnhh', 
// // // //   api_key: '571393811393974', 
// // // //   api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' 
// // // // });

// // // // const upload = multer({ storage: multer.memoryStorage() });

// // // // const documentSchema = new mongoose.Schema({
// // // //   pdfPath: String,
// // // //   signedPdf: String, 
// // // //   signs: Array, 
// // // //   name: String,
// // // //   signerEmail: String,
// // // //   status: { type: String, default: 'Pending' }
// // // // }, { timestamps: true });

// // // // const Document = mongoose.model('Document', documentSchema);

// // // // mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority")
// // // //   .then(() => console.log("✅ DB Connected"))
// // // //   .catch(err => console.error(err));

// // // // // 1. Dashboard List (Fast)
// // // // app.get('/api/documents', async (req, res) => {
// // // //     try {
// // // //         const docs = await Document.find().select('name status createdAt pdfPath signerEmail').sort({ createdAt: -1 }).lean();
// // // //         res.json(docs);
// // // //     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// // // // });

// // // // // 2. Specific Doc for Signing Page
// // // // app.get('/api/doc/:id', async (req, res) => {
// // // //     try {
// // // //         const doc = await Document.findById(req.params.id);
// // // //         if (!doc) return res.status(404).json({ error: "Document not found" });
// // // //         res.json(doc);
// // // //     } catch (e) { res.status(500).json({ error: "Server error" }); }
// // // // });

// // // // // 3. Download/Preview (Fixed Route)
// // // // app.get('/api/documents/download/:id', async (req, res) => {
// // // //     try {
// // // //         const doc = await Document.findById(req.params.id).select('signedPdf pdfPath');
// // // //         if (!doc) return res.status(404).json({ error: "File not found" });
// // // //         res.json({ pdf: doc.signedPdf || doc.pdfPath });
// // // //     } catch (e) { res.status(500).json({ error: "Download error" }); }
// // // // });

// // // // // 4. Submit Signature
// // // // app.post('/api/submit-sign/:id', async (req, res) => {
// // // //     try {
// // // //         const { signaturesMap, email } = req.body;
// // // //         const doc = await Document.findById(req.params.id);
// // // //         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
// // // //         const pdfDoc = await PDFDocument.load(pdfBytes);
        
// // // //         for (const sig of doc.signs) {
// // // //             const sigImg = await pdfDoc.embedPng(signaturesMap[sig.id || sig._id]);
// // // //             const page = pdfDoc.getPages()[sig.page - 1];
// // // //             page.drawImage(sigImg, { 
// // // //                 x: sig.x, 
// // // //                 y: page.getSize().height - sig.y - 50, 
// // // //                 width: 150, 
// // // //                 height: 50 
// // // //             });
// // // //         }
// // // //         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
// // // //         doc.signedPdf = pdfBase64; doc.status = 'Signed'; doc.signerEmail = email;
// // // //         await doc.save();
// // // //         res.json({ pdf: pdfBase64 });
// // // //     } catch (e) { res.status(500).json({ error: "Signing failed" }); }
// // // // });

// // // // // 5. Upload & Generate
// // // // app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
// // // //     try {
// // // //         const b64 = Buffer.from(req.file.buffer).toString("base64");
// // // //         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
// // // //         res.json({ pdfPath: cldRes.secure_url });
// // // //     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// // // // });

// // // // app.post('/api/generate-link', async (req, res) => {
// // // //     try {
// // // //         const newDoc = new Document(req.body);
// // // //         await newDoc.save();
// // // //         res.json({ id: newDoc._id });
// // // //     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// // // // });

// // // // app.listen(5011, '0.0.0.0', () => console.log(`🚀 Final Server on 5011`));



// // // //notun email

// // // const express = require('express');
// // // const mongoose = require('mongoose');
// // // const multer = require('multer');
// // // const cors = require('cors');
// // // const axios = require('axios');
// // // const nodemailer = require('nodemailer'); // Email-er jonno
// // // const { PDFDocument } = require('pdf-lib');
// // // const cloudinary = require('cloudinary').v2;

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json({ limit: '50mb' }));

// // // // Cloudinary & Email Config
// // // cloudinary.config({ cloud_name: 'dxbpamnhh', api_key: '571393811393974', api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' });

// // // // 🔥 Email Transporter (Apnar email details ekhane diben)
// // // const transporter = nodemailer.createTransport({
// // //   service: 'gmail',
// // //   auth: { user: 'your-email@gmail.com', pass: 'your-app-password' } 
// // // });

// // // const documentSchema = new mongoose.Schema({
// // //   pdfPath: String,
// // //   signedPdf: String, 
// // //   signs: Array, 
// // //   name: String,
// // //   signerEmail: String,
// // //   status: { type: String, default: 'Pending' },
// // //   otp: String, // Temporary OTP store
// // //   tempSignData: Object // OTP verify na hoa porjonto sign ekhane thakbe
// // // }, { timestamps: true });

// // // const Document = mongoose.model('Document', documentSchema);
// // // mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority");

// // // // --- API ROUTES ---

// // // // 1. Initial Submit: Email pathabe ar temporary data save korbe
// // // app.post('/api/submit-sign/:id', async (req, res) => {
// // //     try {
// // //         const { signaturesMap, email } = req.body;
// // //         const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
        
// // //         await Document.findByIdAndUpdate(req.params.id, {
// // //             signerEmail: email,
// // //             otp: otpCode,
// // //             tempSignData: signaturesMap
// // //         });

// // //         // Send Email
// // //         await transporter.sendMail({
// // //             from: '"FixenSysign" <noreply@fixensy.com>',
// // //             to: email,
// // //             subject: "Your Document Signing Code",
// // //             text: `Your verification code is: ${otpCode}`
// // //         });

// // //         res.json({ message: "OTP sent to email" });
// // //     } catch (e) { res.status(500).json({ error: "Email failed" }); }
// // // });

// // // // 2. Verify OTP: Code thik hole PDF merge hobe ar status change hobe
// // // app.post('/api/verify-otp', async (req, res) => {
// // //     try {
// // //         const { id, otp } = req.body;
// // //         const doc = await Document.findById(id);

// // //         if (doc.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

// // //         // PDF Merging Logic
// // //         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
// // //         const pdfDoc = await PDFDocument.load(pdfBytes);
        
// // //         for (const sig of doc.signs) {
// // //             const sigImg = await pdfDoc.embedPng(doc.tempSignData[sig.id || sig._id]);
// // //             const page = pdfDoc.getPages()[sig.page - 1];
// // //             page.drawImage(sigImg, { 
// // //                 x: sig.x, y: page.getSize().height - sig.y - 50, 
// // //                 width: 150, height: 50 
// // //             });
// // //         }

// // //         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
        
// // //         // Final Save
// // //         doc.signedPdf = pdfBase64;
// // //         doc.status = 'Signed';
// // //         doc.otp = null; // Clear OTP
// // //         doc.tempSignData = null;
// // //         await doc.save();

// // //         res.json({ pdf: pdfBase64 });
// // //     } catch (e) { res.status(500).json({ error: "Verification failed" }); }
// // // });

// // // // Other routes (Upload, GetDocuments) same thakbe...
// // // app.listen(5011, () => console.log(`🚀 Secure Server on 5011`));



// // const express = require('express');
// // const mongoose = require('mongoose');
// // const multer = require('multer');
// // const cors = require('cors');
// // const axios = require('axios');
// // const nodemailer = require('nodemailer');
// // const { PDFDocument } = require('pdf-lib');
// // const cloudinary = require('cloudinary').v2;

// // const app = express();
// // app.use(cors());
// // app.use(express.json({ limit: '50mb' }));

// // // 🚀 CONFIGURATION
// // cloudinary.config({ 
// //   cloud_name: 'dxbpamnhh', 
// //   api_key: '571393811393974', 
// //   api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' 
// // });

// // // 📧 MAIL TRANSPORTER (Using your credentials)
// // const transporter = nodemailer.createTransport({
// //   service: 'gmail',
// //   auth: {
// //     user: 'bisalsaha42@gmail.com',
// //     pass: 'dokj tvjn kxug nytr' 
// //   }
// // });

// // const upload = multer({ storage: multer.memoryStorage() });

// // // 📄 DATABASE SCHEMA
// // const documentSchema = new mongoose.Schema({
// //   pdfPath: String,
// //   signedPdf: String, 
// //   signs: Array, 
// //   name: String,
// //   signerEmail: String,
// //   status: { type: String, default: 'Pending' },
// //   otp: String,
// //   tempSignData: Object 
// // }, { timestamps: true });

// // const Document = mongoose.model('Document', documentSchema);

// // mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority")
// //   .then(() => console.log("✅ DB Connected & Mail Ready"))
// //   .catch(err => console.error(err));

// // // --- API ROUTES ---

// // // 1. Initial Submit: OTP pathabe
// // app.post('/api/submit-sign/:id', async (req, res) => {
// //     try {
// //         const { signaturesMap, email } = req.body;
// //         const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

// //         await Document.findByIdAndUpdate(req.params.id, {
// //             signerEmail: email,
// //             otp: otpCode,
// //             tempSignData: signaturesMap
// //         });

// //         await transporter.sendMail({
// //             from: '"FixenSysign" <bisalsaha42@gmail.com>',
// //             to: email,
// //             subject: "Your Signing Verification Code",
// //             html: `
// //                 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; max-width: 400px;">
// //                     <h2 style="color: #0284c7; margin-bottom: 10px;">Verify Your Identity</h2>
// //                     <p style="color: #64748b;">Enter the code below to sign your document:</p>
// //                     <div style="background: #f1f5f9; padding: 20px; text-align: center; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #0f172a;">
// //                         ${otpCode}
// //                     </div>
// //                     <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">This code will expire shortly. If you didn't request this, please ignore.</p>
// //                 </div>
// //             `
// //         });

// //         res.json({ message: "OTP Sent" });
// //     } catch (e) { res.status(500).json({ error: "Email failed" }); }
// // });

// // // 2. Verify OTP & Finalize Signing
// // app.post('/api/verify-otp', async (req, res) => {
// //     try {
// //         const { id, otp } = req.body;
// //         const doc = await Document.findById(id);

// //         if (!doc || doc.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

// //         // Load PDF and Draw Signatures
// //         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
// //         const pdfDoc = await PDFDocument.load(pdfBytes);
        
// //         for (const sig of doc.signs) {
// //             const sigImg = await pdfDoc.embedPng(doc.tempSignData[sig.id || sig._id]);
// //             const page = pdfDoc.getPages()[sig.page - 1];
// //             page.drawImage(sigImg, { 
// //                 x: sig.x, 
// //                 y: page.getSize().height - sig.y - 50, 
// //                 width: 150, 
// //                 height: 50 
// //             });
// //         }

// //         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
        
// //         doc.signedPdf = pdfBase64;
// //         doc.status = 'Signed';
// //         doc.otp = null; 
// //         doc.tempSignData = null;
// //         await doc.save();

// //         res.json({ pdf: pdfBase64 });
// //     } catch (e) { res.status(500).json({ error: "Signing failed" }); }
// // });

// // // 3. Admin Dashboard List
// // app.get('/api/documents', async (req, res) => {
// //     try {
// //         const docs = await Document.find().select('name status createdAt pdfPath signerEmail').sort({ createdAt: -1 }).lean();
// //         res.json(docs);
// //     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// // });

// // // 4. Get Doc By ID
// // app.get('/api/doc/:id', async (req, res) => {
// //     try {
// //         const doc = await Document.findById(req.params.id);
// //         res.json(doc);
// //     } catch (e) { res.status(404).json({ error: "Not found" }); }
// // });

// // // 5. Upload PDF
// // app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
// //     try {
// //         const b64 = Buffer.from(req.file.buffer).toString("base64");
// //         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
// //         res.json({ pdfPath: cldRes.secure_url });
// //     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// // });

// // // 6. Generate Link
// // app.post('/api/generate-link', async (req, res) => {
// //     try {
// //         const newDoc = new Document(req.body);
// //         await newDoc.save();
// //         res.json({ id: newDoc._id });
// //     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// // });

// // // 7. Download
// // app.get('/api/documents/download/:id', async (req, res) => {
// //     try {
// //         const doc = await Document.findById(req.params.id).select('signedPdf pdfPath');
// //         res.json({ pdf: doc.signedPdf || doc.pdfPath });
// //     } catch (e) { res.status(500).json({ error: "Error" }); }
// // });

// // app.listen(5011, '0.0.0.0', () => console.log(`🚀 Final Server running on 5011`));



// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const axios = require('axios');
// const nodemailer = require('nodemailer');
// const { PDFDocument } = require('pdf-lib');
// const cloudinary = require('cloudinary').v2;

// const app = express();
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));

// // 🚀 CONFIGURATION
// cloudinary.config({ 
//   cloud_name: 'dxbpamnhh', 
//   api_key: '571393811393974', 
//   api_secret: 'ru0pI30lHa-_qTQh8xicC5RFh6Q' 
// });

// // 📧 MAIL TRANSPORTER
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'bisalsaha42@gmail.com',
//     pass: 'dokj tvjn kxug nytr' 
//   }
// });

// const upload = multer({ storage: multer.memoryStorage() });

// // 📄 DATABASE SCHEMA
// const documentSchema = new mongoose.Schema({
//   pdfPath: String,
//   signedPdf: String, 
//   signs: Array, 
//   name: String,
//   signerEmail: String,
//   status: { type: String, default: 'Pending' },
//   otp: String,
//   tempSignData: Object 
// }, { timestamps: true });

// const Document = mongoose.model('Document', documentSchema);

// mongoose.connect("mongodb+srv://fixensy:e8HUWGbJy3meCrMu@cluster0.8rwk9pl.mongodb.net/fixensysign?retryWrites=true&w=majority")
//   .then(() => console.log("✅ DB Connected & Mail System Active"))
//   .catch(err => console.error(err));

// // --- API ROUTES ---

// // 1. Initial Submit: Email-e OTP pathabe
// app.post('/api/submit-sign/:id', async (req, res) => {
//     try {
//         const { signaturesMap, email } = req.body;
//         const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//         await Document.findByIdAndUpdate(req.params.id, {
//             signerEmail: email,
//             otp: otpCode,
//             tempSignData: signaturesMap
//         });

//         await transporter.sendMail({
//             from: '"FixenSysign" <bisalsaha42@gmail.com>',
//             to: email,
//             subject: "Verification Code for Document Signing",
//             html: `
//                 <div style="font-family: sans-serif; padding: 30px; border: 1px solid #e5e7eb; border-radius: 20px; max-width: 450px; margin: auto;">
//                     <h2 style="color: #0284c7; text-align: center;">Verify Your Identity</h2>
//                     <p style="color: #4b5563; text-align: center;">Use the code below to complete your signature process:</p>
//                     <div style="background: #f8fafc; padding: 20px; text-align: center; border-radius: 15px; font-size: 35px; font-weight: 900; letter-spacing: 8px; color: #1e293b; border: 2px dashed #cbd5e1;">
//                         ${otpCode}
//                     </div>
//                     <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 25px;">This is a secure one-time code. Do not share it with anyone.</p>
//                 </div>
//             `
//         });

//         res.json({ message: "OTP Sent" });
//     } catch (e) { res.status(500).json({ error: "Email failed" }); }
// });

// // 2. Verify OTP & Finalize (Download + Final Mail with Attachment)
// app.post('/api/verify-otp', async (req, res) => {
//     try {
//         const { id, otp } = req.body;
//         const doc = await Document.findById(id);

//         if (!doc || doc.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

//         // Merge Signature into PDF
//         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
//         const pdfDoc = await PDFDocument.load(pdfBytes);
        
//         for (const sig of doc.signs) {
//             const sigImg = await pdfDoc.embedPng(doc.tempSignData[sig.id || sig._id]);
//             const page = pdfDoc.getPages()[sig.page - 1];
//             page.drawImage(sigImg, { 
//                 x: sig.x, 
//                 y: page.getSize().height - sig.y - 50, 
//                 width: 150, 
//                 height: 50 
//             });
//         }

//         const pdfBase64 = await pdfDoc.saveAsBase64({ dataUri: true });
//         const pdfBuffer = await pdfDoc.save(); 
        
//         // Final Database Update
//         doc.signedPdf = pdfBase64;
//         doc.status = 'Signed';
//         doc.otp = null; 
//         doc.tempSignData = null;
//         await doc.save();

//         // 📧 SEND FINAL COMPLIMENTARY EMAIL
//         await transporter.sendMail({
//             from: '"FixenSysign" <bisalsaha42@gmail.com>',
//             to: doc.signerEmail,
//             subject: `Agreement Signed: ${doc.name}`,
//             html: `
//                 <div style="font-family: sans-serif; color: #334155; max-width: 500px; padding: 25px; border: 1px solid #f1f5f9; border-radius: 24px;">
//                     <div style="text-align: center; margin-bottom: 20px;">
//                         <span style="font-size: 50px;">🎉</span>
//                         <h2 style="color: #059669; margin: 10px 0;">Signing Complete!</h2>
//                     </div>
//                     <p>Hello,</p>
//                     <p>Thank you for signing <b>${doc.name}</b>. The process was successful, and your identity has been verified.</p>
//                     <div style="background: #f0fdf4; border-left: 5px solid #059669; padding: 15px; margin: 20px 0; font-style: italic; color: #065f46;">
//                         "Thank you for choosing a faster, greener way to sign. Your copy is attached below for your records."
//                     </div>
//                     <p>If you have any questions, feel free to contact us.</p>
//                     <p style="margin-top: 30px; font-weight: bold; color: #0284c7;">Team FixenSysign</p>
//                 </div>
//             `,
//             attachments: [{
//                 filename: `Signed_${doc.name || 'Document'}.pdf`,
//                 content: pdfBuffer,
//                 contentType: 'application/pdf'
//             }]
//         });

//         res.json({ pdf: pdfBase64 });
//     } catch (e) { res.status(500).json({ error: "Verification failed" }); }
// });

// // Admin Dashboard & Other Routes...
// app.get('/api/documents', async (req, res) => {
//     try {
//         const docs = await Document.find().select('name status createdAt pdfPath signerEmail').sort({ createdAt: -1 }).lean();
//         res.json(docs);
//     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// });

// app.get('/api/doc/:id', async (req, res) => {
//     try {
//         const doc = await Document.findById(req.params.id);
//         res.json(doc);
//     } catch (e) { res.status(404).json({ error: "Not found" }); }
// });

// app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
//     try {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
//         res.json({ pdfPath: cldRes.secure_url });
//     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// });

// app.post('/api/generate-link', async (req, res) => {
//     try {
//         const newDoc = new Document(req.body);
//         await newDoc.save();
//         res.json({ id: newDoc._id });
//     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// });

// app.get('/api/documents/download/:id', async (req, res) => {
//     try {
//         const doc = await Document.findById(req.params.id).select('signedPdf pdfPath');
//         res.json({ pdf: doc.signedPdf || doc.pdfPath });
//     } catch (e) { res.status(500).json({ error: "Error" }); }
// });

// app.listen(5011, '0.0.0.0', () => console.log(`🚀 Secure Server on 5011`));

//deploy

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const axios = require('axios');
// const nodemailer = require('nodemailer');
// const { PDFDocument } = require('pdf-lib');
// const cloudinary = require('cloudinary').v2;

// const app = express();

// // ✅ CORS Fix: Render to Vercel communication
// app.use(cors({
//   origin: '*', 
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type']
// }));

// app.use(express.json({ limit: '50mb' }));

// // Cloudinary Config
// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// // Mail Transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS 
//   }
// });

// const upload = multer({ storage: multer.memoryStorage() });

// // Schema & Model
// const documentSchema = new mongoose.Schema({
//   pdfPath: String,
//   signedPdf: String, 
//   signs: Array, 
//   name: String,
//   signerEmail: String,
//   status: { type: String, default: 'Pending' },
//   otp: String,
//   tempSignData: Object 
// }, { timestamps: true });

// const Document = mongoose.model('Document', documentSchema);

// // DB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ DB Connected"))
//   .catch(err => console.error("❌ DB Connection Error:", err));

// // --- API ROUTES ---

// // 1. Submit Sign (Send OTP)
// app.post('/api/submit-sign/:id', async (req, res) => {
//     try {
//         const { signaturesMap, email } = req.body;
//         const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

//         await Document.findByIdAndUpdate(req.params.id, {
//             signerEmail: email,
//             otp: otpCode,
//             tempSignData: signaturesMap
//         });

//         await transporter.sendMail({
//             from: `"FixenSysign" <${process.env.EMAIL_USER}>`,
//             to: email,
//             subject: "Verification Code for Document Signing",
//             html: `
//                 <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; text-align: center;">
//                     <h2 style="color: #0284c7;">Verify Your Identity</h2>
//                     <p>Your verification code is:</p>
//                     <div style="font-size: 32px; font-weight: bold; color: #1e293b; margin: 20px 0;">${otpCode}</div>
//                 </div>`
//         });

//         res.json({ message: "OTP Sent" });
//     } catch (e) { res.status(500).json({ error: "Email failed" }); }
// });

// // 2. Verify OTP & Finalize (Vertical Positioning Fixed)

// app.post('/api/verify-otp', async (req, res) => {
//     try {
//         const { id, otp } = req.body;
//         const doc = await Document.findById(id);

//         if (!doc || doc.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

//         const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
//         const pdfDoc = await PDFDocument.load(pdfBytes);
        
//         for (const sig of doc.signs) {
//             const signatureData = doc.tempSignData[sig.id || sig._id];
//             if (!signatureData) continue;

//             // Clean Base64 string
//             const cleanBase64 = signatureData.split(',')[1];
//             const sigImg = await pdfDoc.embedPng(Buffer.from(cleanBase64, 'base64'));
            
//             const page = pdfDoc.getPages()[sig.page - 1];
//             const { height } = page.getSize();
            
//             // ✅ THE FIX: Coordinate conversion for Vertical (Y) axis
//             // PDF origin is Bottom-Left (0,0). Browser origin is Top-Left (0,0).
//             // We subtract the browser's Y from the PDF's total height.
//             const signatureHeight = 50; 
//             const signatureWidth = 150;

//             page.drawImage(sigImg, { 
//                 x: sig.x, 
//                 y: height - sig.y - signatureHeight, // Dynamic Vertical Fix
//                 width: signatureWidth, 
//                 height: signatureHeight 
//             });
//         }

//         const pdfBuffer = await pdfDoc.save(); 
        
//         // Final upload to Cloudinary so the signed link stays permanent
//         const b64Signed = Buffer.from(pdfBuffer).toString('base64');
//         const cldRes = await cloudinary.uploader.upload(`data:application/pdf;base64,${b64Signed}`, {
//             resource_type: "auto",
//             folder: "signed_docs"
//         });

//         doc.signedPdf = cldRes.secure_url;
//         doc.status = 'Signed';
//         doc.otp = null; 
//         doc.tempSignData = null;
//         await doc.save();

//         await transporter.sendMail({
//             from: `"FixenSysign" <${process.env.EMAIL_USER}>`,
//             to: doc.signerEmail,
//             subject: `Agreement Signed: ${doc.name}`,
//             html: `<h3>Signing Successful</h3><p>Attached is your signed copy of <b>${doc.name}</b>.</p>`,
//             attachments: [{
//                 filename: `Signed_${doc.name || 'Document'}.pdf`,
//                 content: Buffer.from(pdfBuffer),
//                 contentType: 'application/pdf'
//             }]
//         });

//         res.json({ pdf: cldRes.secure_url });
//     } catch (e) { 
//         console.error(e);
//         res.status(500).json({ error: "Verification failed" }); 
//     }
// });

// // 3. Cloudinary Upload
// app.post('/api/upload-pdf', upload.single('pdfFile'), async (req, res) => {
//     try {
//         const b64 = Buffer.from(req.file.buffer).toString("base64");
//         const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { 
//           resource_type: "auto", 
//           folder: "fixensy" 
//         });
//         res.json({ pdfPath: cldRes.secure_url });
//     } catch (e) { res.status(500).json({ error: "Upload failed" }); }
// });

// // Admin & Others
// app.post('/api/generate-link', async (req, res) => {
//     try {
//         const newDoc = new Document(req.body);
//         await newDoc.save();
//         res.json({ id: newDoc._id });
//     } catch (e) { res.status(500).json({ error: "Link failed" }); }
// });

// app.get('/api/doc/:id', async (req, res) => {
//     try {
//         const doc = await Document.findById(req.params.id);
//         res.json(doc);
//     } catch (e) { res.status(404).json({ error: "Not found" }); }
// });

// app.get('/api/documents', async (req, res) => {
//     try {
//         const docs = await Document.find().sort({ createdAt: -1 });
//         res.json(docs);
//     } catch (e) { res.status(500).json({ error: "Fetch failed" }); }
// });

// const PORT = process.env.PORT || 5011;
// app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server on port ${PORT}`));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');
const { PDFDocument } = require('pdf-lib');
const cloudinary = require('cloudinary').v2;

const app = express();

// ✅ CORS & Payload Limits
app.use(cors({ origin: '*', methods: ['GET', 'POST'] }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// ✅ SSL SMTP for Render (Port 465)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // zubkyznszbazgbqj
  },
  tls: { rejectUnauthorized: false }
});

const Document = mongoose.model('Document', new mongoose.Schema({
  pdfPath: String, signedPdf: String, signs: Array, name: String,
  signerEmail: String, status: { type: String, default: 'Pending' },
  otp: String, tempSignData: Object 
}, { timestamps: true }));

mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ DB Connected"));

// 1. Submit Sign (OTP Send)
app.post('/api/submit-sign/:id', async (req, res) => {
    try {
        const { signaturesMap, email } = req.body;
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        await Document.findByIdAndUpdate(req.params.id, { signerEmail: email, otp: otpCode, tempSignData: signaturesMap });

        console.log(`🚀 [OTP LOG] Code: ${otpCode} for ${email}`);

        transporter.sendMail({
            from: `"FixenSysign" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verification Code: " + otpCode,
            html: `<div style="text-align:center; padding:20px; border:1px solid #ddd; border-radius:10px; font-family:sans-serif;">
                    <h2 style="color:#0284c7;">FixenSysign OTP</h2>
                    <h1 style="letter-spacing:5px;">${otpCode}</h1>
                    <p>Enter this code to sign your document.</p>
                   </div>`
        }).catch(err => console.error("❌ Mail Error:", err.message));

        res.status(200).json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// 2. Verify OTP, Merge & Send Attachment
app.post('/api/verify-otp', async (req, res) => {
    try {
        const { id, otp } = req.body;
        const doc = await Document.findById(id);
        if (!doc || doc.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });

        const pdfBytes = await axios.get(doc.pdfPath, { responseType: 'arraybuffer' }).then(r => r.data);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        
        for (const sig of doc.signs) {
            const signatureData = doc.tempSignData[sig.id || sig._id];
            if (!signatureData) continue;

            // ✅ Black Box Fix: Using PNG and Auto-detection
            let sigImg;
            if (signatureData.includes('image/png')) {
                sigImg = await pdfDoc.embedPng(signatureData);
            } else {
                sigImg = await pdfDoc.embedJpg(signatureData);
            }

            const page = pdfDoc.getPages()[sig.page - 1];
            const { height, width } = page.getSize();
            
            page.drawImage(sigImg, { 
                x: (sig.x * width) / 600, 
                y: height - ((sig.y * height) / 600) - 50, 
                width: 150, 
                height: 50 
            });
        }

        const pdfBuffer = await pdfDoc.save(); 
        const b64Signed = Buffer.from(pdfBuffer).toString('base64');
        const cldRes = await cloudinary.uploader.upload(`data:application/pdf;base64,${b64Signed}`, {
            resource_type: "auto", folder: "signed_docs"
        });

        doc.signedPdf = cldRes.secure_url;
        doc.status = 'Signed';
        doc.otp = null; 
        doc.tempSignData = null;
        await doc.save();

        // ✅ Final Signed PDF Attachment to Email
        transporter.sendMail({
            from: `"FixenSysign" <${process.env.EMAIL_USER}>`,
            to: doc.signerEmail,
            subject: "Your Signed Document",
            text: "Please find your signed document attached.",
            attachments: [{ filename: 'signed_document.pdf', content: pdfBuffer }]
        }).catch(err => console.error("❌ Attachment Mail Error:", err.message));

        res.json({ pdf: cldRes.secure_url });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Admin Routes (Upload PDF etc.)
app.post('/api/upload-pdf', multer({ storage: multer.memoryStorage() }).single('pdfFile'), async (req, res) => {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const cldRes = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${b64}`, { resource_type: "auto", folder: "fixensy" });
    res.json({ pdfPath: cldRes.secure_url });
});

app.post('/api/generate-link', async (req, res) => {
    const newDoc = new Document(req.body);
    await newDoc.save();
    res.json({ id: newDoc._id });
});

app.get('/api/doc/:id', async (req, res) => {
    const doc = await Document.findById(req.params.id);
    res.json(doc);
});

app.get('/api/documents', async (req, res) => {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.json(docs);
});

const PORT = process.env.PORT || 5011;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server running on Port ${PORT}`));