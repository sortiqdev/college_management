// 🔹 Load environment variables FIRST
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// 🔹 Import routes
// const authRoutes = require('./routes/api/Auth.Route'); // existing auth
// later you will add:
const masterRoutes = require('./routes/api/Master.Route');

const app = express();
const server = http.createServer(app);

// 🔹 Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE','UPDATE'],
  credentials: true
}));

// 🔹 Health check (very important for SaaS)
app.get('/', (req, res) => {
  res.send('🚀 SaaS Backend is running');
});

// 🔹 Routes
// app.use('/api', authRoutes);
app.use('/api', masterRoutes); // will enable later

// 🔹 Database connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 5003;
    server.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log('✅ Connected to MongoDB Atlas');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
  });

// 🔹 Global error handler (SaaS best practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});
