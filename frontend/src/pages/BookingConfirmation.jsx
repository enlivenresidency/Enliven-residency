import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const whatsappNumber = location.state?.whatsappNumber || '918328818871';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <h1 className="text-4xl font-bold mb-6 text-primary">Booking Confirmed!</h1>
        <p className="mb-6 text-lg text-gray-700">
          Thank you for confirming your booking.
          <br/>
          Please tap the WhatsApp number below to send your payment screenshot.
        </p>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-green-700 text-3xl font-bold underline hover:text-green-900"
        >
          <FaWhatsapp size={32} />
          +91 83288 18871
        </a>
        <div className="mt-10">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
