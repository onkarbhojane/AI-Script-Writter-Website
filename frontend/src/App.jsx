// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScriptWorkspace from "./pages/ScriptWorkspace";
import MyScripts from "./pages/MyScripts";
import PaymentSuccess from "./pages/PaymentSuccess";
import Navbar from "./components/Navbar";
import Pricing from './pages/Pricing';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workspace" element={<ScriptWorkspace />} />
          <Route path="/myscripts" element={<MyScripts />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/Pricing" element={<Pricing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
