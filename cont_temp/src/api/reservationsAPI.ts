import axiosInstance from "./axiosConfig";
import { Reservation } from "../types/Reservation";

// 모든 예약 목록 조회
export const getAllReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await axiosInstance.get<Reservation[]>("/reservations");
    return response.data;
  } catch (error) {
    console.error("예약 목록을 불러오는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 특정 예약 조회
export const getReservationById = async (
  reservationId: number
): Promise<Reservation> => {
  try {
    const response = await axiosInstance.get<Reservation>(
      `/reservations/${reservationId}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `ID가 ${reservationId}인 예약을 불러오는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};

// 예약 생성
export const createReservation = async (
  reservationData: Omit<
    Reservation,
    "reserve_id" | "status" | "created_at" | "updated_at"
  >
): Promise<Reservation> => {
  try {
    const response = await axiosInstance.post<Reservation>(
      "/reservations",
      reservationData
    );
    return response.data;
  } catch (error) {
    console.error("예약을 생성하는 중 오류가 발생했습니다:", error);
    throw error;
  }
};

// 예약 취소
export const cancelReservation = async (
  reservationId: number
): Promise<void> => {
  try {
    await axiosInstance.delete(`/reservations/${reservationId}`);
  } catch (error) {
    console.error(
      `ID가 ${reservationId}인 예약을 취소하는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};
