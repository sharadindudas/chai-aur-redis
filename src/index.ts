import express from "express";
import Redis from "ioredis";
import mongoose from "mongoose";

const app = express();

const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.get("/redis", async (req, res) => {
  const reply = await redis.ping();
  res.status(200).json({ redis: reply });
});

app.get("/mongo", async (req, res) => {
  try {
    const url = process.env.MONGO_URL || "mongodb://localhost:27017/test_db";

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(url);
    }

    res.status(200).json({ mongo: "connected" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ mongo: "connection failed", error: error.message });
    }
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
