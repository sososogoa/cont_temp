import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllReviews } from "../api/reviewsAPI";
import { Review } from "../types/Review";

const ReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
        setLoading(false);
      } catch (error) {
        setError(`리뷰 목록을 불러오는 중 오류가 발생했습니다 : ${error}`);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p>리뷰 목록</p>
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
  );
};

export default ReviewsList;
