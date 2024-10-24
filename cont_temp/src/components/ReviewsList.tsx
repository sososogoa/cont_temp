import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getAllReviews } from "../api/reviewsAPI";
import { Review } from "../types/Review";
import StarRating from "./StarRating";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  hover: { scale: 1.05 },
};

const ReviewsList = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredRating, setFilteredRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        setError(`리뷰 목록을 불러오는 중 오류가 발생했습니다: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = filteredRating
    ? reviews.filter((review) => review.rating === filteredRating)
    : reviews;

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.div
      className="p-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h2 className="text-xl font-bold mb-4">리뷰 목록</h2>

      {/* Radix UI 토글 그룹 */}
      <ToggleGroup.Root
        type="single"
        defaultValue="all"
        className="flex space-x-2 mb-4"
        onValueChange={(value) =>
          setFilteredRating(value === "all" ? null : parseInt(value))
        }
      >
        {["all", "5", "4", "3", "2", "1"].map((value) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={value}
          >
            <ToggleGroup.Item
              key={value}
              value={value}
              className={`px-4 py-2 rounded-lg cursor-pointer ${
                filteredRating === parseInt(value) ||
                (value === "all" && filteredRating === null)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {value === "all" ? "전체" : `${value}점`}
            </ToggleGroup.Item>
          </motion.div>
        ))}
      </ToggleGroup.Root>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        layout
      >
        <AnimatePresence>
          {filteredReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              whileHover="hover"
              layout
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <Link to={`/rooms/${review.room_id}`} className="block">
                <p className="text-sm text-gray-500">{review.room.name}</p>
                <p className="text-yellow-500">
                  <StarRating score={review.rating} />
                </p>
                <p className="mt-2">{review.comment}</p>
                {review.image_url && (
                  <img
                    src={review.image_url}
                    alt="리뷰 이미지"
                    className="mt-2 rounded-md"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ReviewsList;
