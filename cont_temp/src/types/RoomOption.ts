import { OptionItem } from "./OptionItem";

export interface RoomOption {
  id: number;
  room_id: number;
  optionItem: OptionItem;
  created_at: string;
  updated_at: string;
}
