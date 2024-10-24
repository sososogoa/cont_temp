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
        console.log(data);
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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">리뷰 목록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Link
            key={review.id}
            to={`/rooms/${review.room_id}`}
            className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{review.user.name}</h3>
            <p className="text-sm text-gray-500">호실: {review.room.name}</p>
            <p className="text-yellow-500">평점: {review.rating}</p>
            <p className="mt-2">{review.comment}</p>
            {review.image_url && (
              <img
                src={review.image_url}
                alt="리뷰 이미지"
                className="mt-2 rounded-md"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ReviewsList;
