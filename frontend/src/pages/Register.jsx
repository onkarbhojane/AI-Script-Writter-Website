// src/pages/Register.jsx
import React, { useState, useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext.jsx"; // use global context

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const {user, login } = useContext(AuthContext);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  useEffect(() => {
    if (user) {
      navigate("/workspace");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      login(res.data);
      setTimeout(() => navigate("/workspace"), 0);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <form
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md animate-fadeIn"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700">
          Create Account
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <div className="mb-4 relative">
          <FiUser className="absolute left-3 top-3 text-indigo-400" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 rounded-2xl border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300"
          />
        </div>

        <div className="mb-4 relative">
          <FiMail className="absolute left-3 top-3 text-indigo-400" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 rounded-2xl border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300"
          />
        </div>

        <div className="mb-6 relative">
          <FiLock className="absolute left-3 top-3 text-indigo-400" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full pl-10 p-3 rounded-2xl border-2 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-2xl font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
        >
          Register
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{" "}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
