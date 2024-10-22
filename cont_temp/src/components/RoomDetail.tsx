import { useEffect, useState } from "react";
import { getRoomById } from "../api/roomsAPI";
import { Room } from "../types/Room";
import { RoomOption } from "../types/RoomOption";

interface RoomDetailProps {
  roomId: number;
}

const RoomDetail = ({ roomId }: RoomDetailProps) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const data = await getRoomById(roomId);
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setError(`호실을 조회하는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return room ? (
    <div>
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <p>수용 인원: {room.capacity}</p>
      <p>가격: {room.price}원</p>
      <img src={room.image_url} alt={room.name} />

      <ul>
        {room.RoomOption.length > 0 ? (
          room.RoomOption.map((roomOption: RoomOption) => (
            <li key={roomOption.optionItem.id}>
              {roomOption.optionItem.is_required ? (
                <strong>필수 옵션:</strong>
              ) : (
                <strong>선택 옵션:</strong>
              )}
              {roomOption.optionItem.name}{" "}
              {roomOption.optionItem.is_required
                ? ""
                : `: ${roomOption.optionItem.price}원`}
              {roomOption.optionItem.description && (
                <p>{roomOption.optionItem.description}</p>
              )}
            </li>
          ))
        ) : (
          <p>선택 가능한 옵션이 없습니다.</p>
        )}
      </ul>
    </div>
  ) : (
    <p>호실 정보가 없습니다.</p>
  );
};

export default RoomDetail;
