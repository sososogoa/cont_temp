import { useEffect, useState } from "react";
import { getAllReservations } from "../api/reservationsAPI";
import { Reservation } from "../types/Reservation";

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div>
      <h2>예약 목록</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reserve_id}>
            예약 호실 : {reservation.room.name}
            예약 목적 : {reservation.purpose}
            시작 시간 : {reservation.start_time}
            종료 시간 : {reservation.end_time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
