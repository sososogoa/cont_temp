import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReservationById } from "../api/reservationsAPI";
import { Reservation } from "../types/Reservation";

const ReservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const reservationId = parseInt(id ?? "0");
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const data = await getReservationById(reservationId);
        setReservation(data);
        setLoading(false);
      } catch (error) {
        setError(`예약 정보를 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [reservationId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return reservation ? (
    <div>
      <h2>예약 세부 정보</h2>
      <p>호실 ID: {reservation.room_id}</p>
      <p>사용자 ID: {reservation.user_id}</p>
      <p>예약 상태: {reservation.status}</p>
      <p>시작 시간: {reservation.start_time}</p>
      <p>종료 시간: {reservation.end_time}</p>
      <p>예약 목적: {reservation.purpose}</p>
    </div>
  ) : (
    <p>예약 정보가 없습니다.</p>
  );
};

export default ReservationDetail;
