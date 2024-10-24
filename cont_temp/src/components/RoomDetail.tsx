import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRoomById } from "../api/roomsAPI";
import { getReviewsByRoomId } from "../api/reviewsAPI";
import { Room } from "../types/Room";
import { Review } from "../types/Review";
import StarRating from "./StarRating";

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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{room.name}</h2>
      <p className="mb-2">{room.description}</p>
      <p className="mb-2">수용 인원: {room.capacity}</p>
      <p className="mb-2">가격: {room.price}원</p>

      <img src={room.image_url} alt={room.name} className="rounded-lg mb-4" />

      <div>
        {room.RoomOption.length > 0 ? (
          <>
            <div className="mb-4">
              <strong className="text-green-600">필수 옵션</strong>
              <div>
                {room.RoomOption.filter(
                  (option) => option.optionItem.is_required
                ).map((roomOption) => (
                  <div key={roomOption.optionItem.id}>
                    {roomOption.optionItem.name}(
                    {roomOption.optionItem.description})
                  </div>
                ))}
              </div>
            </div>

            <div>
              <strong className="text-blue-600">선택 옵션</strong>
              <div>
                {room.RoomOption.filter(
                  (option) => !option.optionItem.is_required
                ).map((roomOption) => (
                  <div key={roomOption.optionItem.id}>
                    {roomOption.optionItem.name} : {roomOption.optionItem.price}
                    원
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>선택 가능한 옵션이 없습니다.</p>
        )}
      </div>

      <hr className="my-4" />
      <h3 className="text-lg font-semibold mb-2">고객 후기</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewsLoading ? (
          <p>리뷰를 불러오는 중입니다...</p>
        ) : reviewsError ? (
          <p>{reviewsError}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <p className="text-yellow-500">
                <StarRating score={review.rating} />
              </p>
              <p>{review.comment}</p>
              {review.image_url && (
                <img
                  src={review.image_url}
                  alt="리뷰 이미지"
                  className="mt-2 rounded-md"
                />
              )}
            </div>
          ))
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
