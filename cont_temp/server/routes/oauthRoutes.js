import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

// 네이버 로그인 요청 (네이버 로그인 페이지로 리디렉션)
router.get("/naver", (req, res) => {
  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&
  client_id=${process.env.NAVER_CLIENT_ID}&
  redirect_uri=${process.env.NAVER_REDIRECT_URI}&
  state=${process.env.NAVER_STATE}`;

  res.redirect(naverAuthUrl);
});

// 네이버 로그인 콜백 처리
router.get("/naver/callback", async (req, res) => {
  const { code, state } = req.query;

  if (!code || !state) {
    res.status(400).json({ message: "인증 코드와 상태가 존재하지 않습니다." });
    return;
  }

  try {
    const tokenResponse = await axios.get(
      "https://nid.naver.com/oauth2.0/token",
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.NAVER_CLIENT_ID,
          client_secret: process.env.NAVER_CLIENT_SECRET,
          code: code,
          state: state,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const refreshToken = tokenResponse.data.refresh_token;
    const expires_in = tokenResponse.data.expires_in;
    const token_type = tokenResponse.data.token_type;

    const userInfoResponse = await axios.get(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `${token_type} ${accessToken}`,
        },
      }
    );

    const userInfo = userInfoResponse.data.response;
    const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
      expiresIn: expires_in,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.redirect("http://localhost:5173/home");
  } catch (error) {
    console.error("네이버 로그인 중 오류 발생:", error);
    res.status(500).json({ message: "네이버 로그인 실패" });
  }
});

export default router;
