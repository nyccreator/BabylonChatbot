import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import "../App.css";

export const StarRating = () => {
  const { user, refreshUser } = useAuth();
  const [rating, setRating] = useState(user?.rating ?? null);
  const [hover, setHover] = useState(null);
  const [hasError, setHasError] = useState(false);
  const [stats, setStats] = useState({ average: 0, count: 0 });

  const refreshStats = () =>
    api
      .get("/api/rating/stats")
      .then(setStats)
      .catch(() => {});

  useEffect(() => {
    refreshStats();
  }, []);

  useEffect(() => {
    setRating(user?.rating ?? null);
  }, [user?.rating]);

  if (!user) {
    return (
      <h4 className="flex justify-center pt-5 text-center text-lg font-medium text-babylon-blue-dark">
        Log in to rate Micro-Bot.
      </h4>
    );
  }

  const submitRating = async (value) => {
    const previous = rating;
    setRating(value);
    setHasError(false);
    try {
      await api.patch("/api/rating", { rating: value });
      refreshStats();
      refreshUser();
    } catch (err) {
      console.error(err);
      setHasError(true);
      setRating(previous);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center pt-5">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                className="hidden"
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => submitRating(currentRating)}
              />
              <FaStar
                className="top-5 mb-5 cursor-pointer"
                size={30}
                color={
                  currentRating <= (hover ?? rating ?? 0)
                    ? "#004258"
                    : "#e4e5e9"
                }
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>
      {stats.count > 0 && (
        <div className="flex flex-col items-center pt-6">
          <p className="text-6xl font-bold text-babylon-blue-dark">
            {stats.average.toFixed(1)}
          </p>
          <p className="text-lg font-medium text-babylon-blue-dark">
            {stats.count} {stats.count === 1 ? "rating" : "ratings"}
          </p>
        </div>
      )}
      {hasError && (
        <h4 className="flex justify-center pt-1.5 text-center text-lg font-medium text-babylon-blue-dark">
          Something went wrong. Please try again.
        </h4>
      )}
      {(rating === 1 || rating === 2) && (
        <h4 className="flex justify-center pt-1.5 text-center text-lg font-medium text-babylon-blue-dark">
          We will continue to improve Micro-Bot.
        </h4>
      )}
      {(rating === 3 || rating === 4 || rating === 5) && (
        <h4 className="flex justify-center pt-1.5 text-center text-lg font-medium text-babylon-blue-dark">
          Thank you for your rating!
        </h4>
      )}
    </div>
  );
};
