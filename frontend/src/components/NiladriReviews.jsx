// components/NiladriReviews.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const NiladriReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alisha Praharaj",
      rating: 5,
      text: "Best Hotel in Bhubaneswar in affordable price"
    },
    {
      id: 2,
      name: "Devashree Rout",
      rating: 5,
      text: "Convenient place, efficient staff, good food value for money had a good time staying here. I highly recommend this hotel"
    },
    {
      id: 3,
      name: "Rakesh Mallick",
      rating: 5,
      text: "Luxury, Great view, Quiet, Kid-friendly, Great value"
    },
    {
      id: 4,
      name: "Sai Ranjan",
      rating: 5,
      text: "Nice service with very affordable price !!"
    }
  ];

  const averageRating = 4.8;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-2">
          Guest Reviews
        </h2>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating) 
                    ? 'text-primary' 
                    : i === Math.floor(averageRating) && averageRating % 1 >= 0.5
                    ? 'text-primary'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-semibold text-gray-700">
            {averageRating}
          </span>
        </div>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {review.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 font-heading">
                  {review.name}
                </h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-primary' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-700 font-content leading-relaxed">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NiladriReviews;
