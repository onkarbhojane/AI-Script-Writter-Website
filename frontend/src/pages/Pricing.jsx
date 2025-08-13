// src/pages/Pricing.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-800">
        Pricing Plans
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Free Tier */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col justify-between hover:scale-105 transition-transform duration-300">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-indigo-600">Free</h2>
            <p className="text-gray-600 mb-6">Perfect to get started and try AI script generation.</p>
            <div className="text-5xl font-extrabold mb-6">$0<span className="text-base font-normal"> / month</span></div>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-2"><FiCheck className="text-green-500" /> Generate up to 5 scripts per month</li>
              <li className="flex items-center gap-2"><FiCheck className="text-green-500" /> Access to AI story templates</li>
              <li className="flex items-center gap-2"><FiCheck className="text-green-500" /> Download scripts in TXT/PDF</li>
            </ul>
          </div>
          <Link
            to="/register"
            className="bg-indigo-600 text-white py-3 px-8 rounded-full text-center font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Start Free
          </Link>
        </div>

        {/* Pro Tier */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-3xl shadow-2xl p-10 flex flex-col justify-between transform hover:scale-105 transition-transform duration-300">
          {/* Ribbon for Pro */}
          <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-lg font-bold text-sm shadow-lg">
            Popular
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Pro</h2>
            <p className="mb-6">Unlimited script generation for professional writers and creatives.</p>
            <div className="text-5xl font-extrabold mb-6">$19<span className="text-base font-normal"> / month</span></div>
            <ul className="mb-6 space-y-3">
              <li className="flex items-center gap-2"><FiCheck /> Unlimited script generation</li>
              <li className="flex items-center gap-2"><FiCheck /> AI story templates + custom scripts</li>
              <li className="flex items-center gap-2"><FiCheck /> Download scripts in PDF, TXT, DOCX</li>
              <li className="flex items-center gap-2"><FiCheck /> Priority support</li>
              <li className="flex items-center gap-2"><FiCheck /> Access to future advanced features</li>
            </ul>
          </div>
          <Link
            to="/checkout"
            className="bg-white text-purple-700 py-3 px-8 rounded-full text-center font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
            Subscribe Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
