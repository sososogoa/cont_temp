import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomsAPI";
import { getReviewsByRoomId } from "../api/reviewsAPI";
import { Room } from "../types/Room";
import { RoomOption } from "../types/RoomOption";
import { Review } from "../types/Review";

const RoomDetail = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = parseInt(id ?? "0");
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState<boolean>(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getReviewsByRoomId(roomId);
        setReviews(reviewsData);
        setReviewsLoading(false);
      } catch (error) {
        setReviewsError(`리뷰를 불러오는 중 오류가 발생했습니다 : ${error}`);
        setReviewsLoading(false);
      }
    };

    fetchReviews();
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

      <hr />
      <div>
        <h3>리뷰</h3>
        {reviewsLoading ? (
          <p>리뷰를 불러오는 중입니다...</p>
        ) : reviewsError ? (
          <p>{reviewsError}</p>
        ) : reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>평점: {review.rating}</strong>
                <p>{review.comment}</p>
                {review.image_url && (
                  <img src={review.image_url} alt="리뷰 이미지" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  ) : (
    <p>호실 정보가 없습니다.</p>
  );
};

export default RoomDetail;
