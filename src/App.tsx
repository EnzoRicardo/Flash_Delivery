import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Hero from './Components/Home';
import Order from './Components/Order';
import Profile from './Components/Profile';
import Service from './Components/service';
import AboutUs from './Components/AboutUs';
import Register from './Components/Register';
import RefriCard from './Components/RefriCard';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <Router>
      <Navbar /> 
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/refri" element={<RefriCard />} />
      </Routes>

    </Router>
    
  );
}

export default App;
