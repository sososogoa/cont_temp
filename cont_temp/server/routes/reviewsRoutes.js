import express from "express";
import prisma from "../prisma/context.js";

const router = express.Router();

// 1. 리뷰 목록 조회 (누구나)
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await prisma.roomReview.findMany();
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "리뷰 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

// 2. 특정 호실에 대한 리뷰 조회 (누구나)
router.get("/reviews/room/:room_id", async (req, res) => {
  const roomId = parseInt(req.params.room_id);
  try {
    const reviews = await prisma.roomReview.findMany({
      where: { room_id: roomId },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ error: "해당 호실의 리뷰를 불러오는 중 오류가 발생했습니다." });
  }
});

// 3. 리뷰 작성 (사용자)
router.post("/reviews", async (req, res) => {
  const { user_id, room_id, rating, comment, image_url } = req.body;
  try {
    const newReview = await prisma.roomReview.create({
      data: {
        user_id,
        room_id,
        rating,
        comment,
        image_url,
      },
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: "리뷰를 작성하는 중 오류가 발생했습니다." });
  }
});

// 4. 리뷰 수정 (사용자)
router.put("/reviews/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);
  const { rating, comment, image_url } = req.body;

  try {
    const updatedReview = await prisma.roomReview.update({
      where: { id: reviewId },
      data: {
        rating,
        comment,
        image_url,
      },
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "리뷰를 수정하는 중 오류가 발생했습니다." });
  }
});

// 5. 리뷰 삭제 (사용자)
router.delete("/reviews/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id);

  try {
    await prisma.roomReview.delete({
      where: { id: reviewId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "리뷰를 삭제하는 중 오류가 발생했습니다." });
  }
});

export default router;
