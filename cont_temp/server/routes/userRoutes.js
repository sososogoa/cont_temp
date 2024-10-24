import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../prisma/context.js";

dotenv.config();

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "유저 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

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
