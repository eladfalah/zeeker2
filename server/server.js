const express = require('express');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { spawn } = require('child_process');
const path = require('path');
const connectDB = require('./config/db');
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

const authRouters = require('./routes/authRoutes');
const vehicleRouters = require('./routes/vehicleRoutes');
const messagesRouters = require('./routes/massegesRoutes');
const documentsRouters = require('./routes/documentRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

connectDB();

const serviceAccount = require('./serviceAccountKey.json');
initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "zeekr-89ea8.firebasestorage.app"
});

const frontendPath = path.join(__dirname, '../frontend');
console.log('Starting frontend...');
const frontendProcess = spawn('npm', ['run', 'dev'], {
  cwd: frontendPath,
  stdio: 'inherit',
  shell: true
});

frontendProcess.on('error', (err) => {
  console.error('Failed to start frontend process:', err);
});

const cleanup = () => {
  console.log('Shutting down backend and terminating frontend process...');
  if (frontendProcess) {
    frontendProcess.kill();
  }
  process.exit();
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const app = express();
const port = process.env.PORT || 5000;

const checkAuthStatus = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      const decodedToken = await getAuth().verifyIdToken(token);
      
      req.user = decodedToken;
      req.isLoggedIn = true;
    } else {
      req.user = null;
      req.isLoggedIn = false;
    }
  } catch (error) {
    console.error('Auth check error:', error.message);
    req.user = null;
    req.isLoggedIn = false;
  }
  next();
};

const requireAdmin = (req, res, next) => {
  if (!req.isLoggedIn || !req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(checkAuthStatus);

app.post('/api/admin/set-claim', requireAdmin, async (req, res) => {
  try {
    const { uid } = req.body;
    if (!uid) {
      return res.status(400).json({ error: 'UID is required' });
    }
    await getAuth().setCustomUserClaims(uid, { isAdmin: true });
    res.status(200).json({ message: `Successfully set admin claim for user ${uid}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/auth', authRouters);
app.use('/api/vehicles', vehicleRouters);
app.use('/api/documents', documentsRouters);
app.use('/api/messages', messagesRouters);
app.use('/api', contactRoutes);

app.get('/', (req, res) => {
  res.send('Auth api is running');
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
