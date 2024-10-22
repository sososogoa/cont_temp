import { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "../api/reviewsAPI";
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

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      setError(`리뷰 를 삭제하는 중 오류가 발생했습니다 : ${error}`);
    }
  };

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
            {/* <button onClick={() => handleDeleteReview(review.id)}>삭제</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
