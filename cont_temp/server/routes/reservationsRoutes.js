import express from "express";
import prisma from "../prisma/context.js";

const router = express.Router();

// 1. 예약 목록 조회 (누구나)
router.get("/reservations", async (req, res) => {
  try {
    const reservations = await prisma.roomReserve.findMany({
      include: {
        user: true,
        room: true,
      },
    });
    res.status(200).json(reservations);
  } catch (error) {
    res
      .status(500)
      .json({ error: "예약 목록을 불러오는 중 오류가 발생했습니다." });
  }
});

// 2. 특정 예약 조회 (누구나)
router.get("/reservations/:id", async (req, res) => {
  const reserveId = parseInt(req.params.id);
  try {
    const reservation = await prisma.roomReserve.findUnique({
      where: { reserve_id: reserveId },
    });
    if (!reservation) {
      return res.status(404).json({ error: "해당 예약을 찾을 수 없습니다." });
    }
    res.status(200).json(reservation);
  } catch (error) {
    res
      .status(500)
      .json({ error: "예약 정보를 불러오는 중 오류가 발생했습니다." });
  }
});

// 3. 예약 신청 (사용자)
router.post("/reservations", async (req, res) => {
  const {
    user_id,
    room_id,
    temp_password,
    start_time,
    end_time,
    purpose,
    options,
  } = req.body;
  try {
    const newReservation = await prisma.roomReserve.create({
      data: {
        user_id,
        room_id,
        temp_password,
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        purpose,
        status: "pending",
        options,
      },
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "예약을 신청하는 중 오류가 발생했습니다." });
  }
});

// 4. 예약 변경 (사용자)
router.put("/reservations/:id", async (req, res) => {
  const reserveId = parseInt(req.params.id);
  const { start_time, end_time, purpose, options } = req.body;

  try {
    const updatedReservation = await prisma.roomReserve.update({
      where: { reserve_id: reserveId },
      data: {
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        purpose,
        options,
        status: "pending",
      },
    });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: "예약을 변경하는 중 오류가 발생했습니다." });
  }
});

// 5. 예약 취소 (사용자)
router.delete("/reservations/:id", async (req, res) => {
  const reserveId = parseInt(req.params.id);

  try {
    const cancelledReservation = await prisma.roomReserve.update({
      where: { reserve_id: reserveId },
      data: {
        status: "cancelled",
      },
    });
    res.status(200).json(cancelledReservation);
  } catch (error) {
    res.status(500).json({ error: "예약을 취소하는 중 오류가 발생했습니다." });
  }
});

// 6. 예약 승인 (관리자)
router.put("/reservations/:id/approve", async (req, res) => {
  const reserveId = parseInt(req.params.id);

  try {
    const approvedReservation = await prisma.roomReserve.update({
      where: { reserve_id: reserveId },
      data: {
        status: "approved",
      },
    });
    res.status(200).json(approvedReservation);
  } catch (error) {
    res.status(500).json({ error: "예약을 승인하는 중 오류가 발생했습니다." });
  }
});

// 7. 예약 거절 (관리자)
router.put("/reservations/:id/reject", async (req, res) => {
  const reserveId = parseInt(req.params.id);

  try {
    const rejectedReservation = await prisma.roomReserve.update({
      where: { reserve_id: reserveId },
      data: {
        status: "rejected",
      },
    });
    res.status(200).json(rejectedReservation);
  } catch (error) {
    res.status(500).json({ error: "예약을 거절하는 중 오류가 발생했습니다." });
  }
});

export default router;
