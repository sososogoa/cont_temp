import { Room } from "./Room";
import { User } from "./User";

export interface Review {
  id: number;
  user_id: number;
  room_id: number;
  rating: number;
  comment: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
  user: User;
  room: Room;
}
