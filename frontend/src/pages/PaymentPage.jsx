import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState(null);

  // Redirect if accessed directly without booking data
  useEffect(() => {
    if (!data) {
      navigate('/', { replace: true });
    }
  }, [data, navigate]);

  if (!data) return null;

  const {
    name,
    phone,
    checkin,
    checkout,
    adults,
    children,
    rooms,
    location: locationName,
    baseAmount,
    nights,
    totalAmount,
    
  } = data;

  const whatsappNumber = '918328818871';

  const baseTotal = baseAmount * rooms * nights;
  const gstAmount = Math.round(baseTotal * 0.12);
  const grandTotal = baseTotal + gstAmount;

  // Confirm Booking: Save to backend, then go to confirmation page
  const handleConfirmBooking = async () => {
    setConfirming(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          checkin,
          checkout,
          adults,
          children,
          rooms,
          location: locationName,
          totalAmount,
        }),
      });

      if (!response.ok) {
        const errRes = await response.json();
        setError(errRes.error || 'Failed to confirm booking.');
        setConfirming(false);
        return;
      }

      navigate('/booking-confirmation', { state: { whatsappNumber } });
    } catch (err) {
      setError('Server error: Unable to confirm booking.');
      setConfirming(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Payment Summary</h1>

        {/* Booking Details */}
        <section className="mb-6 text-gray-800">
          <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
          <ul className="space-y-2 text-lg">
            <li><strong>Name:</strong> {name}</li>
            <li><strong>Phone:</strong> {phone}</li>
            <li><strong>Check-in:</strong> {checkin}</li>
            <li><strong>Check-out:</strong> {checkout}</li>
            <li><strong>Adults:</strong> {adults}</li>
            <li><strong>Children:</strong> {children}</li>
            <li><strong>Rooms:</strong> {rooms}</li>
            <li><strong>Location:</strong> {locationName}</li>
          </ul>
        </section>

        {/* Price Breakdown */}
        <section className="mb-6 border-t border-gray-200 pt-4 text-gray-900 font-semibold text-lg">
          <div className="flex justify-between mb-1">
            <span>Room Charges ({rooms} room{rooms > 1 ? 's' : ''} × {nights} night{nights > 1 ? 's' : ''}):</span>
            <span>₹{baseTotal}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (12%):</span>
            <span>₹{gstAmount}</span>
          </div>
          <div className="flex justify-between font-bold text-primary text-xl mt-4 border-t border-gray-200 pt-3">
            <span>Total to Pay:</span>
            <span>₹{grandTotal}</span>
          </div>
        </section>

        {/* Static QR Code */}
        <div className="mb-6 flex justify-center">
          <img
            src="/qr.jpg"
            alt="Payment QR Code"
            className="w-56 h-56 object-contain rounded-lg border shadow"
          />
        </div>

        {/* Error, if any */}
        {error && <div className="text-red-600 font-semibold mb-3">{error}</div>}

        {/* Confirm and Back buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            disabled={confirming}
            onClick={handleConfirmBooking}
            className={`bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow ${
              confirming ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {confirming ? 'Confirming...' : 'Confirm Booking'}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition-transform hover:scale-105 shadow"
          >
            Back to Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
