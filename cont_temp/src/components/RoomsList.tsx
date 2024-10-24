import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRooms } from "../api/roomsAPI";
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">호실 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <Link
            key={room.room_id}
            to={`/rooms/${room.room_id}`}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-lg font-semibold text-blue-500">{room.name}</p>
            <p className="text-sm text-gray-500">{room.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomsList;
