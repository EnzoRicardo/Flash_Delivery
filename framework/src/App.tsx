import React from 'react';
import './App.css';
import Navbar from './Components/pages/Navbar';
import Home from './Components/pages/Home';
import Hero from './Components/pages/Home';
import Order from './Components/pages/Order';
import Profile from './Components/pages/Profile';
import Service from './Components/pages/service';
import AboutUs from './Components/pages/AboutUs';
import SignUp from './Components/pages/SignUp';
import RefriCard from './Components/pages/RefriCard';
import CardComponent from './Components/pages/CardComponent';
import AdminCrud from './Components/pages/AdminCrud';
import ProdutoCrud from './Components/pages/ProdutoCrud';
import CategoriaCrud from './Components/pages/CategoriaCrud';
import CrudProd from './Components/pages/ProdutoCrud2';
import UserCrud from './Components/pages/UserCrud';
import HistoricoCrud from './Components/pages/HistoricoCrud';
import PrivateRoute from './Components/pages/PrivateRoute';
import FinalizarPedido from './Components/pages/FinalizarPedido';
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
        <Route path="/register" element={<SignUp />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/finalizar" element={<FinalizarPedido />} />
        <Route path="/refri/:id" element={<RefriCard />} />
        <Route path="/cards" element={<CardComponent />} />
        <Route path="/admin" element={<PrivateRoute element={<AdminCrud />} />}/>
        <Route path="/produto-crud" element={<PrivateRoute element={<ProdutoCrud />} />}/>
        <Route path="/categoria-crud" element={<PrivateRoute element={<CategoriaCrud />} />}/>
        <Route path="/produto-crud2" element={<PrivateRoute element={<CrudProd />} />}/>
        <Route path="/user-crud" element={<PrivateRoute element={<UserCrud />} />}/>
        <Route path="/historico-crud" element={<PrivateRoute element={<HistoricoCrud />} />}/>
      </Routes>
    </Router>
  );
}

export default App;
