import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import Amenities from "../components/Amenities";
import MiniBookingForm from "../components/MiniBookingForm";
import RoomCarousel from "../components/RoomCarousel";

const images = [
  "/banq1.jpg",
  "/banq2.jpg",
  "/reception2.jpg",
  "/room2.jpg",
];

const PROPERTY_PRICES = {
  Patia: 1200,
  Niladri: 1500,
};

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3500,
  fade: true,
  pauseOnHover: true,
  arrows: false,
  dotsClass: "slick-dots custom-dots",
};

const calculateNights = (checkin, checkout) => {
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  return Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
};

const EnlivenNiladri = () => {
  const formRef = useRef(null);
  const [aboutHeight, setAboutHeight] = useState("auto");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateHeight = () => {
      if (formRef.current && window.innerWidth >= 1024) {
        setAboutHeight(formRef.current.offsetHeight);
      } else {
        setAboutHeight("auto");
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleBookingSubmit = (formData) => {
    setErrorMessage(null);

    const bookingData = { ...formData, location: "niladri" };

    const nights = calculateNights(bookingData.checkin, bookingData.checkout);
    if (nights <= 0 || isNaN(nights)) {
      setErrorMessage("Please enter valid check-in and check-out dates.");
      return;
    }

    const paymentInfo = {
      ...bookingData,
      nights,
      baseAmount: PROPERTY_PRICES["Niladri"] || 1500,
      qrImageUrl: "/static/payment-qr.png",
    };

    navigate("/enliven-niladri/payment", { state: paymentInfo });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-2 sm:px-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary text-center mb-7 tracking-tight">
        Delux Room
      </h1>
      {/* Carousel */}
      <RoomCarousel images={images} />

      {/* About & Contact + Booking Form - responsive */}
      <div className="w-full flex flex-col lg:flex-row gap-10 items-start justify-center mt-6">
        {/* About & Contact - mobile responsive */}
        <div
          className="flex-1 bg-white rounded-xl shadow-lg px-4 sm:px-6 md:px-10 py-6 sm:py-8 mb-8 lg:mb-0"
          style={{ minHeight: aboutHeight }}
        >
          {/* Pricing */}
          <div>
            <div className="flex flex-wrap items-baseline gap-2 mb-8">
              <span className="text-4xl font-extrabold text-primary font-content leading-none">
                ₹1500
              </span>
              <span className="text-xl font-semibold text-gray-600 leading-none">
                +12% GST
              </span>
              <span className="text-lg font-medium text-gray-700 ml-2">
                / night
              </span>
            </div>
            {/* Location */}
            <div className="mb-3">
              <span className="font-semibold text-primary font-heading text-lg">
                Location
              </span>
              <div>
                <a
                  href="https://maps.app.goo.gl/NcPc85GWScYvafJ26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline font-content text-base hover:text-primary"
                >
                  Niladri Vihar, Near Care Hospital (Backside of KV-4), Bhubaneswar - 751021
                </a>
              </div>
            </div>
            {/* Contacts */}
            <div className="mb-3">
              <span className="font-semibold text-primary font-heading text-lg">
                Contact
              </span>
              <div className="flex flex-col gap-2 mt-2">
                {/* Numbers */}
                <div className="flex items-center gap-3">
                  <span className="text-base font-content text-primary">
                    832881887
                  </span>
                  <a
                    href="https://wa.me/918328818871"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+918328818871"
                    className="text-primary hover:text-secondary"
                    title="Call"
                  >
                    <FaPhone className="w-6 h-6" />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-base font-content text-primary">
                    9777959859
                  </span>
                  <a
                    href="https://wa.me/919777959859"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+919777959859"
                    className="text-primary hover:text-secondary"
                    title="Call"
                  >
                    <FaPhone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* About room */}
          <div>
            <h2 className="font-semibold text-primary font-heading text-2xl mb-3">
              About this room
            </h2>
            <p className="text-gray-700 font-content leading-relaxed text-lg">
              Nestled in one of Bhubaneswar's most serene and well-connected neighborhoods, Enliven Residency—Niladri Vihar is your gateway to a refined yet restful stay. Our hotel blends the warmth of traditional Odia hospitality with modern amenities, offering both business and leisure travellers a tranquil escape without compromising on convenience.

              Whether you're visiting Bhubaneswar for work, family events, or simply to explore the heritage-rich capital of Odisha, Enliven Niladri Vihar welcomes you with genuine care, a quiet atmosphere, and the assurance of a truly restful experience.
            </p>
          </div>
        </div>

        {/* Booking form - always below OR beside on desktop */}
        <div className="w-full max-w-sm mx-auto lg:mx-0" ref={formRef}>
          {errorMessage && (
            <div className="text-red-600 font-semibold mb-4 text-center">
              {errorMessage}
            </div>
          )}
          <MiniBookingForm onSubmit={handleBookingSubmit} />
        </div>
      </div>

      <Amenities />
    </div>
  );
};

export default EnlivenNiladri;
