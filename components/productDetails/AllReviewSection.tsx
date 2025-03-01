import { Star } from "lucide-react";
import React from "react";

const AllReviewSection = ({
  data,
  safeReviews,
}: {
  data: any;
  safeReviews: any[];
}) => {
  return (
    <div className="bg-[#F5F5F5] rounded-lg p-6 mb-8">
      <div className="flex gap-8">
        <div>
          <div className="text-4xl font-bold">
            {(data?.averageRating || 0).toFixed(1)}
          </div>
          <div className="flex gap-1 mb-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= (data?.averageRating || 0)
                    ? "text-[#FFC107] fill-[#FFC107]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-600">
            {safeReviews.length} reviews
          </div>
        </div>
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = safeReviews.filter((r) => r.rating === rating).length;
            const percentage =
              safeReviews.length > 0 ? (count / safeReviews.length) * 100 : 0;
            return (
              <div key={rating} className="flex items-center gap-2 mb-1">
                <span className="text-sm text-gray-600 w-4">{rating}</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFC107]"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {Math.round(percentage)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllReviewSection;
