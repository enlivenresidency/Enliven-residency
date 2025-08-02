import React from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaFacebook, FaInstagram } from 'react-icons/fa';

const AboutUs = () => (
  <div className="min-h-screen relative pb-12 flex justify-center overflow-hidden">
    {/* Subtle Background Pattern */}
    <div
      className="absolute inset-0 opacity-10 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at 40px 40px, rgba(104,0,30,0.1) 1px, transparent 1px)`,
        backgroundColor: 'rgba(104, 0, 30, 0.08)',
        backgroundSize: '80px 80px'
      }}
    ></div>
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12 relative z-10">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-secondary mb-4 sm:mb-6 font-serif drop-shadow-sm">About Us</h1>

      <p className="text-base sm:text-xl font-content mb-3 sm:mb-5 leading-relaxed">
        <span className="font-bold text-lg sm:text-2xl text-[#895143]"> Enliven Properties</span> welcomes you to the very best of Bhubaneswar hospitality. With two premier locations—Enliven Patia and Enliven Niladri Vihar—we blend modern comforts, elegant interiors, and personalized service in the city’s most accessible areas. Whether you're traveling for business, leisure, or celebration, our team is dedicated to making your stay effortless and memorable in every detail.
      </p>

      <p className="text-sm sm:text-lg font-content mb-3 sm:mb-4">
        Each of our properties is carefully crafted to offer guests a restful haven after a busy day in Bhubaneswar, featuring all the essential amenities expected from a contemporary hotel: air conditioning, fast WiFi, satellite television, secure parking, uninterrupted power, comprehensive safety measures, and prompt housekeeping. Our spaces are designed for solo travelers, families, or corporate groups—offering both a relaxing overnight and a luxurious extended stay.
      </p>

      <p className="text-sm sm:text-lg font-content mb-3 sm:mb-4">
        For a truly distinguished dining experience, step into <span className="font-semibold text-[#B45F06]">Aghran Restaurant</span>. Known for its distinctive Odia multicuisine spread, lively yet tasteful ambiance, and exceptional service, Aghran is a favorite in the city for both families and corporate gatherings. Whether you're celebrating with loved ones or hosting an impactful corporate party, Aghran makes every occasion exceptional.
      </p>

      <p className="text-sm sm:text-lg font-content mb-6 sm:mb-8">
        At Enliven, your comfort and satisfaction are our inspiration. We thank you for choosing us as your home in Bhubaneswar, and look forward to welcoming you soon.
      </p>

      {/* Contact Details */}
      <div className="flex flex-col gap-6 md:gap-16 md:flex-row md:justify-between bg-[#faf4f1] rounded-xl px-3 sm:px-6 py-5 sm:py-6 shadow border border-[#f2e2d3] mb-6">
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-secondary">Contact Us</h3>
          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <span className="flex flex-wrap items-center">
              <FaPhone className="mr-2 mb-1 sm:mb-0" />
              <a href="tel:918328818871" className="hover:underline">83288 18871</a>,&nbsp;
              <a href="tel:919777959859" className="hover:underline">97779 59859</a>
            </span>
            <span className="flex flex-wrap items-center">
              <FaWhatsapp className="mr-2 text-green-700 mb-1 sm:mb-0" />
              <a href="https://wa.me/918328818871" target="_blank" rel="noopener noreferrer" className="hover:underline">83288 18871</a>,&nbsp;
              <a href="https://wa.me/919777959859" target="_blank" rel="noopener noreferrer" className="hover:underline">97779 59859</a>
            </span>
            <span className="flex flex-wrap items-center">
              <FaEnvelope className="mr-2 mb-1 sm:mb-0" />
              <a href="mailto:aghranbhubaneswar@gmail.com" className="hover:underline break-all">aghranbhubaneswar@gmail.com</a>
            </span>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3 text-secondary">Connect with Us</h3>
          <div className="flex gap-3 sm:gap-6 items-center mt-1">
            <a
              href="https://www.facebook.com/share/1AkbEd1RCC/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 text-xl sm:text-2xl flex items-center"
              title="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/enlivenresidencey/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 text-xl sm:text-2xl flex items-center"
              title="Instagram - Enliven"
            >
              <FaInstagram />
              <span className="text-xs ml-1 hidden sm:inline">Enliven</span>
            </a>
            <a
              href="https://www.instagram.com/aghranrestaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-700 text-xl sm:text-2xl flex items-center"
              title="Instagram - Aghran"
            >
              <FaInstagram />
              <span className="text-xs ml-1 hidden sm:inline">Aghran</span>
            </a>
          </div>
        </div>
      </div>
      <div className="text-xs sm:text-sm text-gray-500 mt-4 font-content">
        &copy; {new Date().getFullYear()} Hotel Enliven, Bhubaneswar. All Rights Reserved.
      </div>
    </div>
  </div>
);

export default AboutUs;
