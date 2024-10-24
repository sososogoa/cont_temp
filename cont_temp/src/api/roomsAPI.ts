import axiosInstance from "./axiosConfig";
import { Room } from "../types/Room";

// 모든 호실 목록 조회
export const getAllRooms = async (): Promise<Room[]> => {
  try {
    const response = await axiosInstance.get<Room[]>("/rooms");
    return response.data;
  } catch (error) {
    console.error("호실 조회 에러 :", error);
    throw error;
  }
};

// 특정 호실 조회
export const getRoomById = async (roomId: number): Promise<Room> => {
  try {
    const response = await axiosInstance.get<Room>(`/rooms/${roomId}`, {
      params: { include: { RoomOption: { include: { optionItem: true } } } },
    });
    return response.data;
  } catch (error) {
    console.error(
      `ID가 ${roomId}인 호실을 불러오는 중 오류가 발생했습니다:`,
      error
    );
    throw error;
  }
};

// 호실 생성
export const createRoom = async (
  roomData: Omit<Room, "room_id">
): Promise<Room> => {
  try {
    const response = await axiosInstance.post<Room>("/rooms", roomData);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};

// 호실 수정
export const updateRoom = async (
  roomId: number,
  roomData: Omit<Room, "room_id">
): Promise<Room> => {
  try {
    const response = await axiosInstance.put<Room>(
      `/rooms/${roomId}`,
      roomData
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating room with ID ${roomId}:`, error);
    throw error;
  }
};

// 호실 삭제
export const deleteRoom = async (roomId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/rooms/${roomId}`);
  } catch (error) {
    console.error(`Error deleting room with ID ${roomId}:`, error);
    throw error;
  }
};
