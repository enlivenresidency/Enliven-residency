import React, { useState } from 'react';

const MiniBookingForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    name: '',
    phone: '',
    adults: '1',
    children: '0',
    rooms: '1',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);

    // Simple client-side validation (optional)
    if (!formData.checkin || !formData.checkout) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }

    if (onSubmit) {
      onSubmit({ ...formData });
    }

    // IMPORTANT: Do NOT call onClose() here.  
    // Let the parent component control closing/navigating.
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 max-w-sm mx-auto"
    >
      <h3 className="text-lg font-bold font-heading text-primary mb-4 text-center">
        Book Your Stay
      </h3>

      {errorMessage && (
        <div className="text-red-600 font-semibold mb-4 text-center">{errorMessage}</div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-4">
        {/* No location input here, location handled by parent */}

        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          placeholder="Check-in Date"
          required
        />

        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          placeholder="Check-out Date"
          required
        />

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
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          pattern="[0-9]{10}"
          title="Enter exactly 10 digits"
          required
        />

        <div className="grid grid-cols-3 gap-4">
          <select
            name="adults"
            value={formData.adults}
            onChange={handleInputChange}
            className="p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num} Adult{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <select
            name="children"
            value={formData.children}
            onChange={handleInputChange}
            className="p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[0, 1, 2, 3, 4].map((num) => (
              <option key={num} value={num}>
                {num} Child{num !== 1 ? 'ren' : ''}
              </option>
            ))}
          </select>

          <select
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
            className="p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Room{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-primary hover:bg-secondary text-white font-bold font-content rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-lg text-lg"
      >
        Book Now
      </button>
    </form>
  );
};

export default MiniBookingForm;
