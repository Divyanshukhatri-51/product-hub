const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = require('http').createServer(app);

// Connect to MongoDB
connectDB();

// Middleware - CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl
    if (!origin) return callback(null, true);
    // allow explicit whitelist
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    // allow vercel subdomains (deployed apps)
    try {
      if (origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
    } catch (e) {
      // ignore
    }
    console.warn('CORS blocked origin:', origin);
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// Allow preflight across the board
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Fallback header setter: ensure Access-Control headers are returned
// even if CORS middleware doesn't add them (helps debugging on Vercel)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  try {
    if (!origin) return next();
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      if (req.method === 'OPTIONS') return res.sendStatus(204);
    }
  } catch (e) {
    // ignore
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/status', (req, res)=> res.send('API is running'));

const PORT = process.env.PORT || 5000;

// If running as a Vercel serverless function, export the Express app.
// Otherwise start the HTTP server for local or non-serverless deployments.
if (process.env.VERCEL) {
  module.exports = app;
} else {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  module.exports = server;
}