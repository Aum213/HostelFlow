require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // NEW: For hashing passwords
const jwt = require('jsonwebtoken'); // NEW: For VIP tokens

// Import our Database Models
const Complaint = require('./models/Complaint');
const Notice = require('./models/Notice');
const User = require('./models/User'); // NEW: User Model

const app = express();

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});
// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 MongoDB Connected Successfully!'))
  .catch((err) => console.log('🔴 MongoDB Connection Error: ', err));


// ==========================================
// 🔐 AUTHENTICATION API ROUTES (NEW)
// ==========================================

// 1. REGISTER a new user
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists." });
    }

    // Determine role based on email domain
    let role = 'student';
    if (email.endsWith('.edu.in')) {
      role = 'admin';
    } else if (!email.endsWith('.ac.in')) {
      return res.status(400).json({ error: "Invalid university email domain." });
    }

    // Hash the password (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await newUser.save();
    res.status(201).json({ message: "Registration successful!" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed." });
  }
});

// 2. LOGIN an existing user
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Check if password matches the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    // Create the VIP Wristband (JWT Token)
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Send token and user info back to React
    res.json({
      token,
      user: { name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
});


// ==========================================
// 📢 NOTICE BOARD API ROUTES
// ==========================================

app.get('/api/notice', async (req, res) => {
  try {
    const latestNotice = await Notice.findOne().sort({ createdAt: -1 });
    res.json(latestNotice || { content: "No active notices at this time." });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notice" });
  }
});

app.post('/api/notice', async (req, res) => {
  try {
    const newNotice = new Notice({ content: req.body.content });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ error: "Failed to post notice" });
  }
});


// ==========================================
// 🛠️ COMPLAINTS API ROUTES
// ==========================================

app.post('/api/complaints', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(500).json({ error: "Failed to submit ticket" });
  }
});

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

app.patch('/api/complaints/:id', async (req, res) => {
  try {
    const updatedComplaint = await Complaint.findOneAndUpdate(
      { ticketId: req.params.id }, 
      { status: req.body.status },
      { new: true } 
    );
    res.json(updatedComplaint);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});