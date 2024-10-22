import { RoomOption } from "./RoomOption";

export interface Room {
  room_id: number;
  name: string;
  description: string;
  capacity: number;
  min_time: number;
  max_time: number;
  price: number;
  image_url: string;
  RoomOption: RoomOption[];
  created_at: string;
  updated_at: string;
}
