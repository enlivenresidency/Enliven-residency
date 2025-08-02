import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PROPERTY_PRICES = {
  patia: 1200,
  'niladri-vihar': 1500,
};

const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    location: '',
    checkin: '',
    checkout: '',
    name: '',
    phone: '',
    adults: '1',
    children: '0',
    rooms: '1',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const calculateNights = (checkin, checkout) => {
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    return Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!['patia', 'niladri-vihar'].includes(formData.location)) {
      setErrorMessage('Please select a valid location.');
      return;
    }

    const nights = calculateNights(formData.checkin, formData.checkout);

    if (nights <= 0 || isNaN(nights)) {
      setErrorMessage('Please select valid check-in and check-out dates.');
      return;
    }

    const paymentInfo = {
      ...formData,
      nights,
      baseAmount: PROPERTY_PRICES[formData.location] || 1200,
      qrImageUrl: '/static/payment-qr.png',
    };

    // Navigate to payment page, passing booking data for confirmation
    if (formData.location === 'patia') {
      navigate('/enliven-patia/payment', { state: paymentInfo });
    } else if (formData.location === 'niladri-vihar') {
      navigate('/enliven-niladri/payment', { state: paymentInfo });
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-heading text-primary mb-2">
          Book Your Stay
        </h2>
        <p className="text-gray-600 font-content">Experience luxury at Hotel Enliven</p>
        <div className="w-24 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>
      </div>

      {errorMessage && (
        <div className="text-red-600 font-semibold mb-4 text-center">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Location */}
        <div>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
          >
            <option value="" disabled>Choose Location</option>
            <option value="niladri-vihar">Niladri Vihar, Bhubaneswar</option>
            <option value="patia">Patia, Bhubaneswar</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            
            required
          />
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Name and Phone */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name *"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone *"
            pattern="[0-9]{10}"
            title="Enter exactly 10 digits"
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
          />
        </div>

        {/* Adults, Children, Rooms */}
        <div className="grid grid-cols-3 gap-4">
          <select
            name="adults"
            value={formData.adults}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[1, 2, 3, 4, 5, 6].map((val) => (
              <option key={val} value={val}>{val} Adult{val > 1 ? 's' : ''}</option>
            ))}
          </select>
          <select
            name="children"
            value={formData.children}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[0, 1, 2, 3, 4].map((val) => (
              <option key={val} value={val}>{val} Child{val !== 1 ? 'ren' : ''}</option>
            ))}
          </select>
          <select
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>{val} Room{val > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 bg-primary hover:bg-secondary text-white font-bold font-content rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg text-lg"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
