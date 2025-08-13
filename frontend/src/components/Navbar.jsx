// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiLogOut, FiFileText, FiEdit } from "react-icons/fi"; // optional icons
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 px-6 shadow-lg flex justify-between items-center">
      <Link
        to="/"
        className="text-3xl font-extrabold tracking-wide hover:text-yellow-300 transition-colors duration-300"
      >
        AI Script Writer
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/workspace"
              className="flex items-center gap-1 px-3 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              <FiEdit />
              Workspace
            </Link>
            <Link
              to="/myscripts"
              className="flex items-center gap-1 px-3 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              <FiFileText />
              My Scripts
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-1 bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              <FiLogOut />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              <FiUser className="inline mr-1" />
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 rounded hover:bg-indigo-700 transition-colors duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
