import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const getToday = () => new Date().toISOString().slice(0, 10);
const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

function minRoomsForGuests(adults, children) {
  adults = parseInt(adults, 10) || 1;
  children = parseInt(children, 10) || 0;
  return Math.max(Math.ceil(adults / 2), Math.ceil(children / 1), 1);
}

const MAX_ADULTS = 10;
const MAX_CHILDREN = 5;
const MAX_ROOMS = 5;

const MiniBookingForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    checkin: getToday(),
    checkout: getTomorrow(),
    name: '',
    phone: '',
    adults: '1',
    children: '0',
    rooms: '1',
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const minRooms = minRoomsForGuests(formData.adults, formData.children);

  useEffect(() => {
    if (parseInt(formData.adults) > MAX_ADULTS) {
      setFormData(f => ({ ...f, adults: String(MAX_ADULTS) }));
    }
    if (parseInt(formData.children) > MAX_CHILDREN) {
      setFormData(f => ({ ...f, children: String(MAX_CHILDREN) }));
    }
    if (parseInt(formData.rooms) < minRooms) {
      setFormData(f => ({ ...f, rooms: String(minRooms) }));
    }
    if (parseInt(formData.rooms) > MAX_ROOMS) {
      setFormData(f => ({ ...f, rooms: String(MAX_ROOMS) }));
    }
  }, [formData.adults, formData.children, minRooms]);

  useEffect(() => {
    if (formData.checkin) {
      const checkinDate = new Date(formData.checkin);
      let nextDate = new Date(checkinDate);
      nextDate.setDate(nextDate.getDate() + 1);
      const nextDateISO = nextDate.toISOString().slice(0, 10);
      if (!formData.checkout || formData.checkout <= formData.checkin) {
        setFormData((f) => ({
          ...f,
          checkout: nextDateISO
        }));
      }
    }
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
    if (parseInt(formData.adults) < 1) {
      setErrorMessage('At least 1 adult required.');
      return;
    }
    if (parseInt(formData.adults) > MAX_ADULTS) {
      setErrorMessage(`Maximum ${MAX_ADULTS} adults allowed.`);
      return;
    }
    if (parseInt(formData.children) > MAX_CHILDREN) {
      setErrorMessage(`Maximum ${MAX_CHILDREN} children allowed.`);
      return;
    }
    if (parseInt(formData.rooms) < minRooms) {
      setErrorMessage(`Minimum rooms required for ${formData.adults} adults and ${formData.children} children is ${minRooms}.`);
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
        <div>
          <label htmlFor="checkin-mini" className="block mb-1 font-semibold text-sm text-gray-700">Check-in Date</label>
          <input
            type="date"
            id="checkin-mini"
            name="checkin"
            value={formData.checkin}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
            min={getToday()}
          />
        </div>
        <div>
          <label htmlFor="checkout-mini" className="block mb-1 font-semibold text-sm text-gray-700">Check-out Date</label>
          <input
            type="date"
            id="checkout-mini"
            name="checkout"
            value={formData.checkout}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
            min={
              formData.checkin
                ? new Date(new Date(formData.checkin).setDate(new Date(formData.checkin).getDate() + 1)).toISOString().slice(0, 10)
                : getTomorrow()
            }
          />
        </div>
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
            {Array.from({ length: MAX_ADULTS }, (_, i) => i + 1).map((num) => (
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
            {Array.from({ length: MAX_CHILDREN + 1 }, (_, i) => i).map((num) => (
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
            {Array.from({ length: MAX_ROOMS - minRooms + 1 }, (_, i) => i + minRooms).map((val) => (
              <option key={val} value={val}>{val} Room{val > 1 ? 's' : ''}</option>
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
