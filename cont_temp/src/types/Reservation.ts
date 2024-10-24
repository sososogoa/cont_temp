import { Room } from "./Room";
import { User } from "./User";
export interface Reservation {
  reserve_id: number;
  user_id: number;
  room_id: number;
  temp_password: number;
  reserve_number: number;
  start_time: string;
  end_time: string;
  purpose: string;
  status: ReservationStatus;
  options: unknown;
  created_at: string;
  updated_at: string;
  user: User;
  room: Room;
}

export enum ReservationStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}
