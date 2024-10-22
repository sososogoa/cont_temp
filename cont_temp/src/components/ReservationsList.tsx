import { useEffect, useState } from "react";
import { getAllReservations, cancelReservation } from "../api/reservationsAPI";
import { Reservation, ReservationStatus } from "../types/Reservation";

const ReservationsList = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await getAllReservations();
        setReservations(data);
        setLoading(false);
      } catch (error) {
        setError(`예약 목록을 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (reservationId: number) => {
    try {
      await cancelReservation(reservationId);
      setReservations(
        reservations.filter(
          (reservation) => reservation.reserve_id !== reservationId
        )
      );
    } catch (error) {
      setError(`예약을 취소하는 중 오류가 발생했습니다 : ${error}`);
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>예약 목록</h2>
      <ul>
        {reservations.map((reservation) => (
          <li key={reservation.reserve_id}>
            호실 ID: {reservation.room_id}, 상태: {reservation.status}, 시작
            시간: {reservation.start_time}, 종료 시간: {reservation.end_time}
            {/* {reservation.status === ReservationStatus.PENDING && (
              <button
                onClick={() => handleCancelReservation(reservation.reserve_id)}
              >
                취소
              </button>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationsList;
