import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// Componente para proteger rotas privadas
const PrivateRoute = ({ element, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null); 
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const adminFlag = localStorage.getItem("isAdmin") === "true";

    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminFlag);
    } else {
      setIsAuthenticated(false);
      setErrorMessage("Você precisa estar logado para acessar esta categoria.");
    }

    if (token && !adminFlag) {
      setIsAuthenticated(true);
      setIsAdmin(false);
      setErrorMessage("Você precisa ser um administrador para acessar esta categoria.");
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.warn(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [errorMessage]); 

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated || !isAdmin) {
    // Se não for logado ou não for admin, redireciona
    return <Navigate to={isAuthenticated ? "/" : "/profile"} />;
  }

  return element;
};

export default PrivateRoute;
