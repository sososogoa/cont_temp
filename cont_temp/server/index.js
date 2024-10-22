import express from "express";
import cors from "cors";
import roomsRouter from "./routes/roomsRoutes.js";
import reservationsRouter from "./routes/reservationsRoutes.js";
import reviewsRouter from "./routes/reviewsRoutes.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 호실 관련 API
app.use("/api", roomsRouter);

// 예약 관련 API
app.use("/api", reservationsRouter);

// 리뷰 관련 API
app.use("/api", reviewsRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
