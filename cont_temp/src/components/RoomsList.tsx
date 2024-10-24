import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getAllRooms } from "../api/roomsAPI";
import { Room } from "../types/Room";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  hover: { scale: 1.05 },
};

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
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence>
          {rooms.map((room) => (
            <motion.div
              key={room.room_id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              layout
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <Link to={`/rooms/${room.room_id}`} className="block">
                <p className="text-lg font-semibold text-blue-500">
                  {room.name}
                </p>
                <p className="text-sm text-gray-500">{room.description}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RoomsList;
