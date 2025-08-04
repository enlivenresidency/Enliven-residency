import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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

    if (parseInt(formData.adults, 10) > adultsMax || parseInt(formData.adults, 10) < 1) {
      setErrorMessage(`Maximum ${adultsMax} adult(s) allowed for ${rooms} room(s).`);
      return;
    }
    if (parseInt(formData.children, 10) > childrenMax) {
      setErrorMessage(`Maximum ${childrenMax} child(ren) (below 6 years) allowed for ${rooms} room(s).`);
      return;
    }

    const paymentInfo = {
      ...formData,
      nights,
      baseAmount: PROPERTY_PRICES[formData.location] || 1200,
      qrImageUrl: '/static/payment-qr.png',
    };

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
    <div className="p-4 xs:p-6 sm:p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl xs:text-3xl font-bold font-heading text-primary mb-2">
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
            className="w-full text-sm sm:text-base px-2 py-2 sm:px-3 sm:py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-all duration-300 leading-tight"
            required
          >
            <option value="" disabled>Choose Location</option>
            <option value="niladri-vihar">Niladri Vihar, Bhubaneswar</option>
            <option value="patia">Patia, Bhubaneswar</option>
          </select>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="date"
            name="checkin"
            value={formData.checkin}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
            min={new Date().toISOString().slice(0, 10)}
          />
          <input
            type="date"
            name="checkout"
            value={formData.checkout}
            onChange={handleInputChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
            required
            min={
              formData.checkin
                ? new Date(new Date(formData.checkin).setDate(new Date(formData.checkin).getDate() + 1))
                    .toISOString()
                    .slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }
          />
        </div>

        {/* Name and Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            {[1, 2, 3, 4, 5].map((val) => (
              <option key={val} value={val}>{val} Room{val > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <p className="mt-1 text-xs text-gray-500 font-content">
          <span className="font-semibold text-secondary">Note:</span> Each room allows <span className="font-semibold">up to 2 adults and 1 child (age below 6)</span>.<br />
          <span>
            See our <Link to="/refund-policy" className="underline text-secondary hover:text-primary">refund policy</Link>.
          </span>
        </p>

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
