interface StarRatingProps {
  score: number;
}

const StarRating = ({ score }: StarRatingProps) => {
  const getStars = (score: number): string => {
    const filledStars = "★".repeat(score);
    const emptyStars = "☆".repeat(5 - score);
    return filledStars + emptyStars;
  };

  return <>{getStars(score)}</>;
};

export default StarRating;
