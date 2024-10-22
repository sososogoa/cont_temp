import axiosInstance from "./axiosConfig";
import { Review } from "../types/Review";

// 모든 리뷰 조회
export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<Review[]>("/reviews");
    return response.data;
  } catch (error) {
    console.error("리뷰 목록을 불러오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 특정 호실에 대한 리뷰 조회
export const getReviewsByRoomId = async (roomId: number): Promise<Review[]> => {
  try {
    const response = await axiosInstance.get<Review[]>(
      `/reviews/room/${roomId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `ID가 ${roomId}인 호실에 대한 리뷰를 불러오는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};

// 리뷰 생성
export const createReview = async (
  reviewData: Omit<Review, "id" | "created_at" | "updated_at">
): Promise<Review> => {
  try {
    const response = await axiosInstance.post<Review>("/reviews", reviewData);
    return response.data;
  } catch (error) {
    console.error("리뷰를 작성하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 리뷰 수정
export const updateReview = async (
  reviewId: number,
  reviewData: Omit<Review, "id" | "created_at" | "updated_at">
): Promise<Review> => {
  try {
    const response = await axiosInstance.put<Review>(
      `/reviews/${reviewId}`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error(
      `ID가 ${reviewId}인 리뷰를 수정하는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};

// 리뷰 삭제
export const deleteReview = async (reviewId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/reviews/${reviewId}`);
  } catch (error) {
    console.error(
      `ID가 ${reviewId}인 리뷰를 삭제하는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};
