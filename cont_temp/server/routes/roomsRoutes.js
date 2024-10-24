import express from "express";
import prisma from "../prisma/context.js";

const router = express.Router();

// 1. 호실 목록 조회
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await prisma.room.findMany();
    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ error: "호실 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

// 2. 특정 호실 조회
router.get("/rooms/:id", async (req, res) => {
  const roomId = parseInt(req.params.id);
  try {
    const room = await prisma.room.findUnique({
      where: { room_id: roomId },
      include: {
        RoomOption: {
          include: {
            optionItem: true,
          },
        },
      },
    });

    if (!room) {
      return res.status(404).json({ error: "해당 호실을 찾을 수 없습니다." });
    }

    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ error: "호실 정보를 불러오는 중 오류가 발생했습니다." });
  }
});

// 3. 호실 생성
router.post("/rooms", async (req, res) => {
  const { name, description, capacity, min_time, max_time, price, image_url } =
    req.body;
  try {
    const newRoom = await prisma.room.create({
      data: {
        name,
        description,
        capacity,
        min_time,
        max_time,
        price,
        image_url,
      },
    });
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: "호실을 생성하는 중 오류가 발생했습니다." });
  }
});

// 4. 호실 수정
router.put("/rooms/:id", async (req, res) => {
  const roomId = parseInt(req.params.id);
  const { name, description, capacity, min_time, max_time, price, image_url } =
    req.body;

  try {
    const updatedRoom = await prisma.room.update({
      where: { room_id: roomId },
      data: {
        name,
        description,
        capacity,
        min_time,
        max_time,
        price,
        image_url,
      },
    });
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({ error: "호실을 수정하는 중 오류가 발생했습니다." });
  }
});

// 5. 호실 삭제
router.delete("/rooms/:id", async (req, res) => {
  const roomId = parseInt(req.params.id);
  try {
    await prisma.room.delete({
      where: { room_id: roomId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "호실을 삭제하는 중 오류가 발생했습니다." });
  }
});

export default router;
