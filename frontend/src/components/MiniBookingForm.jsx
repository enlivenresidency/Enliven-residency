import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

  const rooms = parseInt(formData.rooms, 10) || 1;
  const adultsMax = rooms * 2;
  const childrenMax = rooms * 1;

  React.useEffect(() => {
    if (parseInt(formData.adults, 10) > adultsMax) {
      setFormData(f => ({ ...f, adults: String(adultsMax) }));
    }
    if (parseInt(formData.children, 10) > childrenMax) {
      setFormData(f => ({ ...f, children: String(childrenMax) }));
    }
    // eslint-disable-next-line
  }, [rooms]);

  React.useEffect(() => {
    if (formData.checkin) {
      const checkinDate = new Date(formData.checkin);
      let nextDate = new Date(checkinDate);
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDateISO = nextDate.toISOString().slice(0, 10);
      if (
        !formData.checkout ||
        formData.checkout <= formData.checkin
      ) {
        setFormData((f) => ({
          ...f,
          checkout: nextDateISO
        }));
      }
    }
    // eslint-disable-next-line
  }, [formData.checkin]);

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

    if (!formData.checkin || !formData.checkout) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }
    if (formData.phone.replace(/\D/g, '').length !== 10) {
      setErrorMessage('Phone number must be exactly 10 digits.');
      return;
    }
    if (parseInt(formData.adults, 10) > adultsMax || parseInt(formData.adults, 10) < 1) {
      setErrorMessage(`Maximum ${adultsMax} adult(s) allowed for ${rooms} room(s).`);
      return;
    }
    if (parseInt(formData.children, 10) > childrenMax) {
      setErrorMessage(`Maximum ${childrenMax} child(ren) allowed for ${rooms} room(s).`);
      return;
    }

    if (onSubmit) {
      onSubmit({ ...formData });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-4 xs:p-6 max-w-sm mx-auto"
    >
      <h3 className="text-lg sm:text-xl font-bold font-heading text-primary mb-4 text-center">
        Book Your Stay
      </h3>

      {errorMessage && (
        <div className="text-red-600 font-semibold mb-4 text-center">{errorMessage}</div>
      )}

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="date"
          name="checkin"
          value={formData.checkin}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          placeholder="Check-in Date"
          required
          min={new Date().toISOString().slice(0, 10)}
        />

        <input
          type="date"
          name="checkout"
          value={formData.checkout}
          onChange={handleInputChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
          placeholder="Check-out Date"
          required
          min={
            formData.checkin
              ? new Date(new Date(formData.checkin).setDate(new Date(formData.checkin).getDate() + 1))
                  .toISOString()
                  .slice(0, 10)
              : new Date().toISOString().slice(0, 10)
          }
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select
            name="adults"
            value={formData.adults}
            onChange={handleInputChange}
            className="w-full text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all duration-300 leading-tight"
          >
            {Array.from({ length: adultsMax }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num} Adult{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>

          <select
            name="children"
            value={formData.children}
            onChange={handleInputChange}
            className="w-full text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all duration-300 leading-tight"
          >
            {Array.from({ length: childrenMax + 1 }, (_, i) => i).map((num) => (
              <option key={num} value={num}>
                {num} Child{num !== 1 ? 'ren' : ''}
              </option>
            ))}
          </select>

          <select
            name="rooms"
            value={formData.rooms}
            onChange={handleInputChange}
            className="w-full text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all duration-300 leading-tight"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Room{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-1 text-xs text-gray-500 font-content mb-4">
        <span className="font-semibold text-secondary">Note:</span> Each room allows <span className="font-semibold">up to 2 adults and 1 child (below 6 yrs)</span>.<br />
        <span>
          See our <Link to="/refund-policy" className="underline text-secondary hover:text-primary">refund policy</Link>.
        </span>
      </p>

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
