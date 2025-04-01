import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Hero from './Components/Home';
import Order from './Components/Order';
import Profile from './Components/Profile';
import Service from './Components/service';
import ServiceArea from './Components/ServiceArea';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
}

export default App;
