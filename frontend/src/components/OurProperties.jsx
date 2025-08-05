import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const OurProperties = () => {
  const properties = [
    {
      id: 1,
      name: "Enliven Residency",
      address: "Starcity, Patia, KIIT, Bhubaneswar – 751024",
      type: "hotel",
      image: "/reception1.png",
      description:
        "Experience luxury accommodation with modern amenities and royal comfort in the heart of Patia.",
      buttonText: "Book Now",
      link: "/enliven-patia",
    },
    {
      id: 2,
      name: "Enliven Residency",
      address:
        "Niladri Vihar, Near Care Hospital (Backside of KV-4)  Bhubaneswar - 751021",
      type: "hotel",
      image: "/room2.jpg",
      description:
        "Premium hotel experience with elegant rooms and exceptional service in Niladri Vihar.",
      buttonText: "Book Now",
      link: "/enliven-niladri",
    },
    {
      id: 3,
      name: "Aghran",
      address:
        "Niladri Vihar, Near Care Hospital (Backside of KV-4), Bhubaneswar - 751021",
      type: "restaurant",
      image: "/rest4.jpg",
      description:
        "An authentic Odia multi-cuisine restaurant offering traditional flavors with contemporary dining experience.",
      buttonText: "View Details",
      link: "/aghran-restaurant",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 30px 30px, rgba(104,0,30,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">
            Our Properties
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 font-content max-w-2xl mx-auto">
            Discover our collection of luxury accommodations and fine dining
            experiences across Bhubaneswar
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group flex flex-col h-full"
            >
              {/* Property Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Property Name */}
                <h3 className="text-2xl font-bold font-heading text-primary mb-2">
                  {property.name}
                </h3>

                {/* Address */}
                <div className="flex items-center text-gray-600 mb-4">
                  <FaMapMarkerAlt className="w-4 h-4 mr-2 text-secondary" />
                  <span className="font-content text-sm">
                    {property.address}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 font-content text-sm leading-relaxed mb-6 flex-grow">
                  {property.description}
                </p>

                {/* Action Link Button */}
                <Link
                  to={property.link}
                  className="w-full bg-primary hover:bg-secondary text-white font-bold font-content py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center group mt-auto"
                >
                  <span className="mr-2">{property.buttonText}</span>
                  <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
      </div>
    </section>
  );
};

export default OurProperties;
