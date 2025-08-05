import React, { useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RoomCarousel = ({ images }) => {
  const sliderRef = useRef();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    fade: true,
    cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
    pauseOnHover: true,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
  };

  const nextSlide = () => sliderRef.current.slickNext();
  const prevSlide = () => sliderRef.current.slickPrev();

  return (
    <div className="w-full mb-10 relative">
      <div className="rounded-xl overflow-hidden shadow-lg bg-white w-full">
        <Slider ref={sliderRef} {...sliderSettings}>
          {images.map((img, i) => (
            <div key={i}>
              <img
                src={img}
                alt={`Room Slide ${i + 1}`}
                className="w-full h-[48vw] max-h-[400px] min-h-[180px] sm:h-[30vw] sm:max-h-[520px] sm:min-h-[280px] object-cover"
                style={{ margin: 0, padding: 0, display: "block" }}
              />
            </div>
          ))}
        </Slider>
        {/* Side navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      <style jsx>{`
        .custom-dots {
          bottom: 12px !important;
        }
        .custom-dots li button:before {
          color: #68001e !important;
          font-size: 12px !important;
          opacity: 0.7 !important;
        }
        .custom-dots li.slick-active button:before {
          color: #68001a !important;
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default RoomCarousel;
