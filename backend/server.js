const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
const MONGO_URI = 'mongodb://localhost:27017/teamMembersDB';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;
    cb(null, uniqueName);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  }
});

// Member Schema
const memberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  rollNumber: { type: String, required: true, trim: true },
  year: { type: String, required: true },
  degree: { type: String, required: true },
  email: { type: String, trim: true },
  role: { type: String, trim: true },
  project: { type: String },
  hobbies: { type: [String], default: [] },
  certificate: { type: String },
  internship: { type: String },
  aboutYourAim: { type: String },
  image: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Member = mongoose.model('Member', memberSchema);

// ─── ROUTES ───────────────────────────────────────────────────────────────────

// POST /members - Add a new member
app.post('/members', upload.single('image'), async (req, res) => {
  try {
    const { name, rollNumber, year, degree, email, role, project, hobbies, certificate, internship, aboutYourAim } = req.body;

    if (!name || !rollNumber || !year || !degree) {
      return res.status(400).json({ error: 'Name, Roll Number, Year, and Degree are required.' });
    }

    const hobbiesArray = hobbies
      ? (Array.isArray(hobbies) ? hobbies : hobbies.split(',').map(h => h.trim()).filter(Boolean))
      : [];

    const member = new Member({
      name, rollNumber, year, degree, email, role, project,
      hobbies: hobbiesArray,
      certificate, internship, aboutYourAim,
      image: req.file ? `uploads/${req.file.filename}` : ''
    });

    await member.save();
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// GET /members - Get all members
app.get('/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /members/:id - Get single member
app.get('/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /members/:id - Delete a member
app.delete('/members/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    // Delete image file if exists
    if (member.image) {
      const filePath = path.join(__dirname, member.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Also support /api/members routes (for browser testing as per assignment)
app.get('/api/members', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/members/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
