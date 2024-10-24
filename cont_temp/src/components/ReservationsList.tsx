import { useEffect, useState } from "react";
import { getAllReservations } from "../api/reservationsAPI";
import { Reservation } from "../types/Reservation";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion, AnimatePresence } from "framer-motion";

// 상태값 타입 정의
type ReservationStatus = "pending" | "approved" | "rejected" | "cancelled";

const statusLabels: Record<ReservationStatus, string> = {
  pending: "신청",
  approved: "승인",
  rejected: "거절",
  cancelled: "취소",
};

const statusStyles: Record<ReservationStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-800",
};

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredStatus, setFilteredStatus] =
    useState<ReservationStatus | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        console.log(data);
        setReservations(data);
        setLoading(false);
      } catch (error) {
        setError(`예약 목록을 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const filteredReservations = filteredStatus
    ? reservations.filter(
        (reservation) => reservation.status === filteredStatus
      )
    : reservations;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">예약 목록</h2>

      {/* Radix UI 토글 그룹 */}
      <ToggleGroup.Root
        type="single"
        defaultValue="all"
        className="flex space-x-2 mb-4"
        onValueChange={(value) =>
          setFilteredStatus(
            value === "all" ? null : (value as ReservationStatus)
          )
        }
      >
        {["all", "pending", "approved", "rejected", "cancelled"].map(
          (value) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              key={value}
            >
              <ToggleGroup.Item
                value={value}
                className={`px-4 py-2 rounded-lg cursor-pointer ${
                  filteredStatus === value ||
                  (value === "all" && !filteredStatus)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {value === "all"
                  ? "전체"
                  : statusLabels[value as ReservationStatus]}
              </ToggleGroup.Item>
            </motion.div>
          )
        )}
      </ToggleGroup.Root>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredReservations.map((reservation) => (
            <motion.div
              key={reservation.reserve_id}
              className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              layout
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {reservation.room.name}
                </h3>
                <motion.span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    statusStyles[reservation.status as ReservationStatus]
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  {statusLabels[reservation.status as ReservationStatus]}
                </motion.span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                예약 목적 : {reservation.purpose}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                시작 시간 : {new Date(reservation.start_time).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                종료 시간 : {new Date(reservation.end_time).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReservationsList;
