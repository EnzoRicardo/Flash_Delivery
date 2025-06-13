import React, { useEffect, useState } from 'react';
import "../css/CardComponent.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardComponent = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/categorialist')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Erro ao buscar categorias:', err));
  }, []);

  const checkAuthAndNavigate = (categoriaId) => {
    const isLogged = localStorage.getItem('userToken');
    if (isLogged) {
      navigate(`/refri/${categoriaId}`);
    } else {
      toast.warn('Você precisa estar logado para acessar esta categoria.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      navigate('/profile');
    }
  };

  return (
    <div className="drinks-card-container">
      {categorias.map((cat) => (
        <div className="card-order" key={cat.id_categoria}>
          <div className="card-drinks">
            <img
              src={cat.imagem}
              alt={cat.nome_categoria}
              onClick={() => checkAuthAndNavigate(cat.id_categoria)}
            />
            <p className="card-title">{cat.nome_categoria}</p>
          </div>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default CardComponent;
