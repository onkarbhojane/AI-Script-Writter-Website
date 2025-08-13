// src/pages/PaymentSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-6">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h2>
        <p className="mb-6">Thank you for your subscription. You now have full access to generate unlimited scripts.</p>
        <Link
          to="/workspace"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Go to Workspace
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
