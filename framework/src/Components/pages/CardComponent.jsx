import React, { useEffect, useState } from 'react'; // Removed 'use', added 'useState'
import "../css/CardComponent.css";
// Image imports are not used in the current logic for displaying dynamic categories,
// but you can reintegrate them if needed for specific static cards or default images.
// import cervejaIMG from "../../assets/cards/Cerveja Card.png"
// import refriIMG from "../../assets/cards/Refri Card.png"
// import dpIMG from "../../assets/cards/Drinks Pronto.png"
// import destiladoIMG from "../../assets/cards/Destilados.png"
// import vinhosIMG from "../../assets/cards/Vinhos.png"
// import aguaIMG from "../../assets/cards/Agua.png"
import { useNavigate } from 'react-router-dom';
// CategoriaLista component is not used for fetching data in this corrected version
// import CategoriaLista from '../controllers/categoriaLista';

const CardComponent = () => {
  const [categorias, setCategorias] = useState([]); // Renamed for clarity
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await fetch('http://localhost:8080/api/categoria');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id_categoria) => {
    
    navigate(`/categoria/${id_categoria}`);
  };

  return (
    <div className='card-container'>
      {categorias.length > 0 ? (
        categorias.map((item) => (
          <div
            className='card'
            key={item.id_categoria}
            onClick={() => handleCardClick(item.id_categoria)}
          >
            <h3>{item.nome_categoria}</h3>
            {/* If your category data has a 'descricao' field, you can display it */}
            {/* <p>{item.descricao}</p> */}
          </div>
        ))
      ) : (
        <p>Nenhuma categoria encontrada.</p> // Message for when no categories are loaded
      )}
    </div>
  );
};

export default CardComponent;