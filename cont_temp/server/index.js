import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import roomsRouter from "./routes/roomsRoutes.js";
import reservationsRouter from "./routes/reservationsRoutes.js";
import reviewsRouter from "./routes/reviewsRoutes.js";
import oauthRouter from "./routes/oauthRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // 허용할 프론트엔드의 주소
    credentials: true, // 쿠키를 허용하는 옵션
  })
);
app.use(express.json());
app.use(cookieParser());

// 호실 관련 API
app.use("/api", roomsRouter);

// 예약 관련 API
app.use("/api", reservationsRouter);

// 리뷰 관련 API
app.use("/api", reviewsRouter);

// 소셜 로그인 API
app.use("/api/oauth", oauthRouter);

// 유저 관련 API
app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
