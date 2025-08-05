import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import BookingForm from "./BookingForm";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const sliderRef = useRef(null);

  const carouselImages = [
    {
      id: 1,
      url: "/banq3.jpg",
      title: "Banquet",
      subtitle: "Gather. Feast. Celebrate.",
    },
    {
      id: 2,
      url: "/room1.jpg",
      title: "Stay in Comfort, Dine in Style",
      subtitle: "Elegant rooms with modern amenities",
    },
    {
      id: 3,
      url: "/rest2.jpg",
      title: "Dine the Difference",
      subtitle: "Authentic taste. Elegant ambience.",
    },
    {
      id: 4,
      url: "/artf.jpg",
      title: "Designed to Impress",
      subtitle: "Aesthetic charm in every detail.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !isBookingOpen,
    autoplaySpeed: 4500,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    pauseOnHover: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);
  const nextSlide = () => sliderRef.current.slickNext();
  const prevSlide = () => sliderRef.current.slickPrev();

  return (
    <div className="relative h-[60vw] max-h-[680px] min-h-[320px] sm:h-screen overflow-hidden">
      <div className="relative h-full">
        <Slider ref={sliderRef} {...settings} className="h-full">
          {carouselImages.map((image) => (
            <div
              key={image.id}
              className="relative h-[60vw] max-h-[680px] min-h-[320px] sm:h-screen"
            >
              <div
                className="h-full w-full bg-cover bg-center bg-no-repeat relative"
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              >
                {/* Slide Content */}
                <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-2">
                  <div className="text-white max-w-3xl px-2 sm:px-4 mx-auto">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-bold font-heading mb-2 sm:mb-4 drop-shadow-lg leading-tight sm:leading-[1.1]">
                      {image.title}
                    </h1>
                    <p className="text-base xs:text-lg sm:text-xl md:text-2xl font-content mb-6 sm:mb-8 drop-shadow-md font-medium">
                      {image.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <button
          onClick={prevSlide}
          className="absolute left-2 xs:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 xs:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 xs:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 xs:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        <div className="absolute bottom-6 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={openBooking}
            className="bg-primary hover:bg-secondary text-white font-bold font-content py-3 px-6 xs:py-4 xs:px-8 rounded-lg text-base xs:text-lg shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            BOOK NOW
          </button>
        </div>
      </div>

      {/* Booking Overlay */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm animate-backdropFade"
            onClick={closeBooking}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-2 sm:mx-4 animate-elegantSlideUp">
            <button
              onClick={closeBooking}
              className="absolute top-4 right-4 text-primary hover:text-secondary p-2 rounded-full hover:bg-gray-100 transition-all duration-300 z-10"
            >
              <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <BookingForm onClose={closeBooking} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes backdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes elegantSlideUp {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          60% {
            opacity: 0.8;
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-backdropFade {
          animation: backdropFade 0.4s ease-out;
        }
        .animate-elegantSlideUp {
          animation: elegantSlideUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .custom-dots {
          bottom: 18px !important;
        }
        @media (min-width: 640px) {
          .custom-dots {
            bottom: 40px !important;
          }
        }
        .custom-dots li button:before {
          color: #68001E !important;
          font-size: 12px !important;
          opacity: 0.7 !important;
        }
        .custom-dots li.slick-active button:before {
          color: #68001A !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
