import React, { useRef } from "react";
import Slider from "react-slick";
import {
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselImages = [
  { url: "/rest2.jpg", caption: "Vibrant Ambience" },
  { url: "/rest4.jpg", caption: "Odia Flavours Reimagined" },
  { url: "/artf.jpg", caption: "Perfect for Celebrations & Corporates" },
];

const foodGallery = ["/food1.jpg", "/food2.jpg", "/chef1.jpg", "/chef2.jpg"];

const specials = [
  "Authentic Odia thali & delicacies",
  "Fiery Tandoori & juicy kebabs",
  "Classic Continental specialities",
  "Spice-loaded North fare",
  "Slurp-worthy Chinese",
];

const AghranRestaurant = () => {
  const sliderRef = useRef();

  const heroSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3600,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dotsClass: "slick-dots aghran-dots",
  };

  const prevSlide = () => sliderRef.current.slickPrev();
  const nextSlide = () => sliderRef.current.slickNext();

  return (
    <main className="min-h-screen bg-[#f7f2ee] relative pb-10 sm:pb-16">
      {/* Hero Carousel */}
      <section className="relative h-[48vw] min-h-[220px] max-h-[370px] xs:h-[65vw] xs:min-h-[260px] xs:max-h-[520px] sm:h-[56vw] sm:min-h-[310px] sm:max-h-[520px] md:h-[36vw] md:min-h-[400px] md:max-h-[520px] lg:min-h-[400px] lg:max-h-[520px] overflow-hidden mb-8 xs:mb-10">
        <Slider ref={sliderRef} {...heroSettings}>
          {carouselImages.map((img, i) => (
            <div key={i}>
              <div
                className="relative w-full h-[48vw] min-h-[220px] max-h-[370px] xs:h-[65vw] xs:min-h-[260px] xs:max-h-[520px] sm:h-[56vw] sm:min-h-[310px] sm:max-h-[520px] md:h-[36vw] md:min-h-[400px] md:max-h-[520px]"
                style={{
                  backgroundImage: `url(${img.url})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <div className="absolute inset-0 bg-[#64201b4d] mix-blend-multiply"></div>
                <div className="absolute inset-0 flex items-center justify-center px-1 xs:px-2">
                  <h1 className="text-center drop-shadow-lg text-white font-bold font-heading text-xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight">
                    Aghran Odia Multicuisine Restaurant
                  </h1>
                </div>
                {img.caption && (
                  <div className="absolute bottom-3 xs:bottom-6 left-1/2 -translate-x-1/2 text-xs xs:text-base sm:text-lg tracking-wide bg-[#00000055] px-3 xs:px-6 py-1.5 xs:py-2 rounded-full font-content text-white">
                    {img.caption}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
        {/* Side arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-1.5 xs:left-3 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 xs:p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <FaChevronLeft className="w-5 h-5 xs:w-6 xs:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1.5 xs:right-3 top-1/2 transform -translate-y-1/2 z-20 bg-primary hover:bg-secondary text-white p-2 xs:p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <FaChevronRight className="w-5 h-5 xs:w-6 xs:h-6" />
        </button>
        <style>{`
          .aghran-dots {
            bottom: 8px !important;
          }
          @media (min-width: 640px) {
            .aghran-dots {
              bottom: 22px !important;
            }
          }
          .aghran-dots li button:before {
            color: #b45f06 !important;
            opacity: 0.7 !important;
            font-size: 13px !important;
          }
          .aghran-dots li.slick-active button:before {
            color: #895143 !important;
            opacity: 1 !important;
          }
        `}</style>
      </section>

      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 40px 40px, rgba(180,95,6,0.1) 1px, transparent 1px)`,
          backgroundColor: "rgba(180, 95, 6, 0.06)",
          backgroundSize: "80px 80px",
        }}
      ></div>

      {/* Main Content */}
      <section className="relative z-10 max-w-4xl xl:max-w-5xl mx-auto px-2 xs:px-4">
        <div className="bg-white/90 rounded-2xl shadow-lg border-l-4 border-primary px-4 xs:px-6 sm:px-8 md:px-10 py-7 sm:py-10 md:py-12 mt-6 sm:mt-8 mb-8 sm:mb-10">
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-primary font-heading drop-shadow">
            A Royal Odia Dining Destination
          </h2>
          <p className="text-sm xs:text-base sm:text-lg font-content text-gray-800 mb-3 sm:mb-4 leading-relaxed">
            Discover the heart of Odisha’s culinary traditions brought alive
            with a global twist, in an ambience that is both regal and inviting.{" "}
            <span className="font-semibold text-secondary">Aghran</span>{" "}
            welcomes you with warm hospitality, refined interiors, and a menu
            that celebrates both homegrown Odia classics and much-loved world
            cuisines.
          </p>
          <p className="text-sm xs:text-base sm:text-lg font-content text-gray-800 mb-4 sm:mb-5">
            <span className="italic text-primary">
              From fiery Tandoori to comforting Continental, spice-loaded Desi
              to slurp-worthy Chinese…&nbsp; We serve flavours from every
              corner, for every craving.
            </span>
          </p>
          <ul className="list-disc pl-6 sm:pl-8 text-xs xs:text-sm sm:text-base text-gray-700 mb-4 font-content">
            {specials.map((dish, i) => (
              <li key={i} className="py-1">
                {dish}
              </li>
            ))}
          </ul>
          <p className="text-sm xs:text-base sm:text-lg font-content text-gray-800">
            <span className="font-semibold">Aghran</span> is the go-to address
            for memorable family meals, elegant evenings, and spectacular
            corporate parties in Bhubaneswar. Step in for a taste of Odisha’s
            finest!
          </p>
        </div>

        {/* Gallery grid */}
        <div className="mb-9 sm:mb-12">
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold font-heading text-primary mb-2 sm:mb-3 text-center">
            Aghran Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 max-w-3xl mx-auto">
            {foodGallery.map((img, idx) => (
              <div
                key={idx}
                className="overflow-hidden rounded-xl hover:shadow-xl transition-all duration-300 group"
              >
                <img
                  src={img}
                  alt={`Aghran food highlight ${idx + 1}`}
                  className="w-full h-[22vw] xs:h-[31vw] sm:h-[150px] md:h-[180px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Location */}
        <div className="mt-6 sm:mt-8 bg-[#fff7ef] border-l-4 border-primary rounded-xl px-4 xs:px-6 py-5 sm:px-8 sm:py-6 shadow flex flex-col md:flex-row items-stretch md:justify-between gap-4 sm:gap-5">
          {/* Reservation & Enquiries */}
          <div className="flex-1 min-w-0 mb-2">
            <div className="mb-1 text-[13px] sm:text-sm text-primary uppercase font-bold">
              Reservation & Enquiries
            </div>
            <div className="flex flex-wrap items-center mb-1 text-base sm:text-lg text-primary font-content">
              <FaPhone className="mr-2" />
              <a href="tel:918328818871" className="hover:underline">
                83288 18871
              </a>
              <span className="mx-2">|</span>
              <a href="tel:919777959859" className="hover:underline">
                97779 59859
              </a>
            </div>
            <div className="flex flex-wrap items-center text-base sm:text-lg text-primary font-content">
              <FaWhatsapp className="mr-2 text-green-700" />
              <a
                href="https://wa.me/918328818871"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                83288 18871
              </a>
              <span className="mx-2">|</span>
              <a
                href="https://wa.me/919777959859"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                97779 59859
              </a>
            </div>
          </div>
          {/* Follow Us */}
          <div className="flex-1 min-w-0 mb-2">
            <div className="mb-1 text-[13px] sm:text-sm text-primary uppercase font-bold">
              Follow Us
            </div>
            <a
              href="https://www.instagram.com/aghranrestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-secondary text-base sm:text-lg font-content"
            >
              <FaInstagram className="mr-2" />
              @aghranrestaurant
            </a>
          </div>
          {/* Location */}
          <div className="flex-1 min-w-0 mb-2">
            <div className="mb-1 text-[13px] sm:text-sm text-primary uppercase font-bold">
              Location
            </div>
            <a
              href="https://maps.app.goo.gl/cYpxdxCKYxA4rjWf8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-800 font-content hover:text-secondary transition-colors hover:underline"
              title="View on Google Maps"
            >
              <FaMapMarkerAlt className="mr-2 " />
              <span className="text-xs xs:text-sm sm:text-base">
                Inside Hotel Enliven, Patia & Niladri Vihar, Bhubaneswar
              </span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AghranRestaurant;
