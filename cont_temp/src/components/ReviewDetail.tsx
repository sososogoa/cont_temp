import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByRoomId } from "../api/reviewsAPI";
import { Review } from "../types/Review";

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const roomId = parseInt(id ?? "0");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByRoomId(roomId);
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(`리뷰를 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [roomId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return reviews.length > 0 ? (
    <div>
      <h2>리뷰 세부 정보</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            평점: {review.rating}, 내용: {review.comment}
            {review.image_url && (
              <img src={review.image_url} alt="리뷰 이미지" />
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>리뷰 정보가 없습니다.</p>
  );
};

export default ReviewDetail;
