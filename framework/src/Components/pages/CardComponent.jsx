import React, { useEffect, useState } from 'react';
import "../css/CardComponent.css";
import { useNavigate } from 'react-router-dom';

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
      navigate('/profile', {
        state: { notLogged: true }
      });
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
    </div>
  );
};

export default CardComponent;
