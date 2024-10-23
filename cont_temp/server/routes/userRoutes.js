import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

router.get("/userinfo", async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const userInfo = jwt.verify(token, process.env.JWT_SECRET);
    res.json(userInfo);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
});

export default router;
