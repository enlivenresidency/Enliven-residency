import React from "react";
import {
  FaWifi,
  FaTv,
  FaSnowflake,
  FaCar,
  FaCreditCard,
  FaFire,
  FaBolt,
  FaVideo,
  FaShieldAlt,
  FaUtensils,
  FaTruck,
  FaShower,
} from "react-icons/fa";

const amenities = [
  {
    icon: <FaWifi className="w-8 h-8" />,
    title: "Free WiFi",
    description: "High-speed internet access",
  },
  {
    icon: <FaTv className="w-8 h-8" />,
    title: "Satellite & Cable TV",
    description: "Premium channels available",
  },
  {
    icon: <FaSnowflake className="w-8 h-8" />,
    title: "AC",
    description: "Climate controlled rooms",
  },
  {
    icon: <FaCar className="w-8 h-8" />,
    title: "Car Parking",
    description: "Secure parking facility",
  },
  {
    icon: <FaCreditCard className="w-8 h-8" />,
    title: "Card Payment",
    description: "Cashless transactions",
  },
  {
    icon: <FaFire className="w-8 h-8" />,
    title: "Geyser",
    description: "Hot water available",
  },
  {
    icon: <FaBolt className="w-8 h-8" />,
    title: "Power Backup",
    description: "Uninterrupted power supply",
  },
  {
    icon: <FaVideo className="w-8 h-8" />,
    title: "CCTV Camera",
    description: "24/7 security monitoring",
  },
  {
    icon: <FaShieldAlt className="w-8 h-8" />,
    title: "Fire-Extinguisher",
    description: "Safety equipment",
  },
  {
    icon: <FaBolt className="w-8 h-8" />,
    title: "Electric Kettle",
    description: "In-room beverage facility",
  },
  // 12, 13, 14: will be specially placed
  {
    icon: <FaShower className="w-8 h-8" />,
    title: "Toiletries",
    description: "Premium bath amenities",
  },
  {
    icon: <FaUtensils className="w-8 h-8" />,
    title: "Dine-in Area",
    description: "Comfortable dining space",
  },
  {
    icon: <FaTruck className="w-8 h-8" />,
    title: "Room Delivery of Food",
    description: "In-room dining service",
  },
];

const Amenities = () => {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: "rgba(104, 0, 30, 0.08)" }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 40px 40px, rgba(104,0,30,0.1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      ></div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            Rooms and Amenities
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-700 font-content max-w-2xl mx-auto">
            Experience luxury and comfort with our comprehensive range of modern
            amenities and services
          </p>
        </div>
        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* First 10 boxes as usual */}
          {amenities.slice(0, 10).map((amenity, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="text-primary mb-4 flex justify-center">
                {amenity.icon}
              </div>
              <h3 className="text-sm font-bold font-content text-gray-800 mb-2 leading-tight">
                {amenity.title}
              </h3>
              <p className="text-xs text-gray-600 font-content leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}

          <div className="hidden xl:block"></div>

          {amenities.slice(10).map((amenity, i) => (
            <div
              key={i + 10}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
            >
              <div className="text-primary mb-4 flex justify-center">
                {amenity.icon}
              </div>
              <h3 className="text-sm font-bold font-content text-gray-800 mb-2 leading-tight">
                {amenity.title}
              </h3>
              <p className="text-xs text-gray-600 font-content leading-relaxed">
                {amenity.description}
              </p>
            </div>
          ))}

          <div className="hidden xl:block"></div>
        </div>

        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default Amenities;
