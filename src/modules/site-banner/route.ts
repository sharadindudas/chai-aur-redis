import { Router } from "express";
import { redisClient } from "../../lib/redis";

const siteBannerRouter = Router();

const BANNER_KEY = "app:banner";

siteBannerRouter.get("/banner", async (req, res) => {
  const message = await redisClient.get(BANNER_KEY);
  res.status(200).json({ message });
});

siteBannerRouter.post("/banner", async (req, res) => {
  const { message } = req.body;
  await redisClient.set(BANNER_KEY, message || "Welcome to chai aur redis!");
  res.status(200).json({ message: "Banner updated successfully" });
});

siteBannerRouter.delete("/banner", async (req, res) => {
  await redisClient.del(BANNER_KEY);
  res.status(200).json({ message: "Banner deleted successfully" });
});

siteBannerRouter.get("/banner/exists", async (req, res) => {
  const exists = await redisClient.exists(BANNER_KEY);
  res.status(200).json({ exists: Boolean(exists) });
});

export default siteBannerRouter;
