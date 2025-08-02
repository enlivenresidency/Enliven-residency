import React from "react";

const RefundPolicy = () => (
  <div className="min-h-screen relative pb-12 flex justify-center overflow-hidden">
    {/* Subtle Background Pattern */}
    <div
      className="absolute inset-0 opacity-10 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at 40px 40px, rgba(104,0,30,0.1) 1px, transparent 1px)`,
        backgroundColor: 'rgba(104, 0, 30, 0.08)',
        backgroundSize: '80px 80px'
      }}
    />
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-4 py-8 sm:py-12 relative z-10">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-secondary mb-4 sm:mb-6 font-serif drop-shadow-sm">
        Refund & Cancellation Policy
      </h1>
      <p className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-800 leading-relaxed font-content">
        At Hotel Enliven, we understand that plans can change. Our refund and cancellation policy is designed to be fair and transparent, ensuring peace of mind for our esteemed guests.
      </p>

      <div className="bg-white/90 rounded-xl shadow p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 border-secondary">
        <h2 className="font-bold text-base sm:text-lg text-secondary mb-2">
          Cancellation Charges
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-800">
          <li>
            <span className="font-semibold">Cancelled before 48 hours</span> of check-in: <span className="text-green-700 font-medium">Full refund</span> of booking amount.
          </li>
          <li>
            <span className="font-semibold">Cancelled before 24 hours</span> of check-in: <span className="text-yellow-700 font-medium">50% refund</span> of booking amount.
          </li>
          <li>
            <span className="font-semibold">Cancelled within 24 hours</span> of check-in:
            <span className="text-red-700 font-medium ml-1">No refund</span> (booking is non-refundable).
          </li>
        </ul>
      </div>

      <div className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-700 font-content">
        <p className="mb-2">
          <span className="font-semibold text-secondary">Refund process:</span> Approved refunds will be processed within 7 working days to the original payment method, subject to your bank or payment provider’s timelines.
        </p>
        <p className="mb-2">
          <span className="font-semibold text-secondary">How to cancel:</span> To request a cancellation, please contact us via phone or WhatsApp at <a href="tel:+918328818871" className="underline text-primary">+91 83288 18871</a>.
        </p>
        <p>
          For any concerns or clarifications regarding your refund, contact us at <a className="underline text-primary" href="mailto:aghranbhubaneswar@gmail.com">aghranbhubaneswar@gmail.com</a>. Our team is happy to assist you.
        </p>
      </div>

      <div className="text-xs text-gray-500 mt-6 sm:mt-8 font-content">
        This policy may be updated from time to time. Last updated: {new Date().getFullYear()}
      </div>
    </div>
  </div>
);

export default RefundPolicy;
