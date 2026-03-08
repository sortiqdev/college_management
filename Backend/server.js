require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectMongo = require("./config/mongoConnnection");
const prisma = require("./config/prismaClient");

const app = express();

/* ===============================
   MIDDLEWARE
================================ */

app.use(cors());
app.use(express.json());

/* ===============================
   DATABASE CONNECTIONS
================================ */

const startServer = async () => {
  try {

    // MongoDB connection
    await connectMongo();

    // PostgreSQL connection
    await prisma.$connect();
    console.log("✅ PostgreSQL Connected");

    // Test route
    app.get("/", (req, res) => {
      res.send("🚀 Master Panel Backend Running");
    });

    // Start server
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error);
  }
};

startServer();