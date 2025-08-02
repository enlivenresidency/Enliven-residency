import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../assets/logo/enliven.png';

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "FAQs", href: "#" },
  { name: "Gallery", href: "#" }
];

const ourProperties = [
  { name: "Enliven Residency, Patia", href: "/enliven-patia" },
  { name: "Enliven Residency, Niladri Vihar", href: "/enliven-niladri" },
  { name: "Aghran Restaurant", href: "/aghran-restaurant" }
];

const socialLinks = [
  {
    icon: <FaFacebookF />,
    href: "https://www.facebook.com/share/1AkbEd1RCC/",
    color: "hover:text-blue-600"
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/enlivenresidencey/",
    color: "hover:text-pink-500"
  }
];

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Hotel Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img
                  src={logo}
                  alt="Hotel Enliven"
                  className="h-12 w-auto mr-3"
                />
                <span className="text-xl font-bold text-primary font-heading">
                  HOTEL ENLIVEN
                </span>
              </div>
              <p className="text-gray-600 font-content text-sm leading-relaxed pr-4">
                Experience royal comfort and luxury at Hotel Enliven. We provide exceptional accommodation and dining experiences across Bhubaneswar.
              </p>

              {/* Social Links */}
              <div className="flex space-x-3 pt-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-gray-100 p-2.5 rounded-full text-primary ${social.color} hover:bg-gray-200 transition-all duration-300 transform hover:scale-110`}
                  >
                    <span className="w-4 h-4 flex items-center justify-center">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-primary">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm inline-block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Properties */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-primary">
                Our Properties
              </h3>
              <ul className="space-y-2">
                {ourProperties.map((property, index) => (
                  <li key={index}>
                    <a
                      href={property.href}
                      className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm inline-block py-1"
                    >
                      {property.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-heading text-primary">
                Connect With Us
              </h3>
              <div className="space-y-3">
                {/* Phone */}
                <div className="flex items-center">
                  <div className="w-6 flex justify-center mr-3">
                    <FaPhone className="w-4 h-4 text-secondary" />
                  </div>
                  <a
                    href="tel:+918328818871"
                    className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                  >
                    +91 83288 18871
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center">
                  <div className="w-6 flex justify-center mr-3">
                    <FaWhatsapp className="w-4 h-4 text-secondary" />
                  </div>
                  <a
                    href="https://wa.me/919777959859"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                  >
                    +91 97779 59859
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="w-6 flex justify-center mr-3">
                    <FaEnvelope className="w-4 h-4 text-secondary" />
                  </div>
                  <a
                    href="mailto:aghranbhubaneswar@gmail.com"
                    className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                  >
                    aghranbhubaneswar@gmail.com
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="w-6 flex justify-center mr-3 mt-0.5">
                    <FaMapMarkerAlt className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-primary font-content text-sm">
                    <p className="font-medium">Multiple Locations</p>
                    <p className="text-gray-600 text-xs mt-1">Patia & Niladri Vihar</p>
                    <p className="text-gray-600 text-xs">Bhubaneswar, Odisha</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 mt-10 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 font-content text-sm text-center md:text-left">
                Copyright © 2025 Hotel Enliven. All rights reserved. Developed by
                <span className="text-primary hover:text-secondary transition-colors duration-300 ml-1 cursor-pointer">
                  Swagat
                </span>
              </p>

              <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-center md:text-right">
                <a
                  href="#"
                  className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="/refund-policy"
                  className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                >
                  Refund Policy
                </a>
                <a
                  href="/login"
                  className="text-primary hover:text-secondary transition-colors duration-300 font-content text-sm"
                >
                  Admin Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
