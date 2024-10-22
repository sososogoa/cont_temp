import { useEffect, useState } from "react";
import { getAllRooms, deleteRoom } from "../api/roomsAPI";
import { Room } from "../types/Room";

const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(`호실을 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleDeleteRoom = async (roomId: number) => {
    try {
      await deleteRoom(roomId);
      setRooms(rooms.filter((room) => room.room_id !== roomId));
    } catch (error) {
      setError(`호실을 삭제하는 중 오류가 발생했습니다 : ${error}`);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>호실 목록</p>
      <ul>
        {rooms.map((room) => (
          <li key={room.room_id}>
            {room.name}
            {/* <button onClick={() => handleDeleteRoom(room.room_id)}>삭제</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsList;
