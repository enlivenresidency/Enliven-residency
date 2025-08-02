import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MiniBookingForm from "../components/MinibookingForm";
import { FaWhatsapp, FaPhone } from "react-icons/fa";
import Amenities from "../components/Amenities";
import RoomCarousel from "../components/RoomCarousel";

const images = [
  "/room2.jpg",
  "/room1.jpg"
  
  
];

const PROPERTY_PRICES = {
  Patia: 1200,
  Nilri: 1500,
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

const EnlivenPatia = () => {
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

  // --- IMPORTANT CHANGE HERE: ONLY NAVIGATE, DO NOT CALL API ---
  const handleBookingSubmit = (formData) => {
    setErrorMessage(null);

    // Inject property location fixed as per page
    const bookingData = { ...formData, location: "Patia" };

    // Calculate nights
    const nights = calculateNights(bookingData.checkin, bookingData.checkout);
    if (nights <= 0 || isNaN(nights)) {
      setErrorMessage("Please enter valid check-in and check-out dates.");
      return;
    }

    const paymentInfo = {
      ...bookingData,
      nights,
      baseAmount: PROPERTY_PRICES["Patia"] || 1200,
      qrImageUrl: "/static/payment-qr.png", // adjust accordingly
    };

    // Navigate to payment page and pass booking data as state
    navigate("/enliven-patia/payment", { state: paymentInfo });

    // Optional: clear form or close modal can be handled here
    // if your UI supports it
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-12 px-2 sm:px-4">
      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary text-center mb-7 tracking-tight">
        Delux Room
      </h1>

      {/* Carousel */}
      <RoomCarousel images={images} />

      {/* About & Contact */}
      <div className="w-full flex flex-col lg:flex-row gap-10 items-start justify-center mt-6">
        <div
          className="flex-1 bg-white rounded-xl shadow-lg px-10 py-8"
          style={{ minHeight: aboutHeight }}
        >
          {/* Pricing */}
          <div>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-extrabold text-primary font-content leading-none">
                ₹1200
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
                  href="https://goo.gl/maps/x5rQP..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary underline font-content text-base hover:text-primary"
                >
                  Starcity, Patia, KIIT, Bhubaneswar – 751024
                </a>
              </div>
            </div>
            {/* Contacts */}
            <div className="mb-3">
              <span className="font-semibold text-primary font-heading text-lg">
                Contact
              </span>
              <div className="flex flex-col gap-2 mt-2">
                {/* Number 1 */}
                <div className="flex items-center gap-3">
                  <span className="text-base font-content text-primary">
                    832881887
                  </span>
                  <a
                    href="https://wa.me/9183288187"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+9183288187"
                    className="text-primary hover:text-secondary"
                    title="Call"
                  >
                    <FaPhone className="w-6 h-6" />
                  </a>
                </div>
                {/* Number 2 */}
                <div className="flex items-center gap-3">
                  <span className="text-base font-content text-primary">
                    9777959859
                  </span>
                  <a
                    href="https://wa.me/9197779598"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                  </a>
                  <a
                    href="tel:+9197779598"
                    className="text-primary hover:text-secondary"
                    title="Call"
                  >
                    <FaPhone className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* About Room */}
          <div>
            <h2 className="font-semibold text-primary font-heading text-2xl mb-3">
              About this room
            </h2>
            <p className="text-gray-700 font-content leading-relaxed text-lg">
              Positioned in the vibrant heart of Bhubaneswar’s fast-growing Patia district, Enliven Residency—Patia brings a remarkable blend of contemporary style, unmatched convenience, and gracious service to the city’s hospitality scene. Our hotel caters equally to discerning business travellers, vacationing families, and guests seeking a seamless, rejuvenating stay near the city’s IT corridor, shopping hubs, and universities.


From quick business stopovers to extended city breaks, Enliven Residency, Patia is your home in Bhubaneswar—where urban sophistication meets heartfelt Odia hospitality.

            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="w-full max-w-sm" ref={formRef}>
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

export default EnlivenPatia;
