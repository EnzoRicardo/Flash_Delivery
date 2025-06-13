import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProdutoCrud from './ProdutoCrud';
import "../css/AdminCrud.css"


function AdminCrud() {
  return (
      <div className='link-container'>
        <nav>
          <Link to="/categoria-crud"><h2>Gerenciar Categorias</h2></Link>
          <Link to="/produto-crud2"><h2>Gerenciar Produtos</h2></Link>
          <Link to="/user-crud"><h2>Gerenciar Usuários</h2></Link>
        </nav>

        <Routes>
          {/* Change the path here to match the link */}
          <Route path="/produto" element={<ProdutoCrud />} />
          {/* <Route path="/categoria" element={<CategoriaCrud />} />
          <Route path="/usuario" element={<UsuarioCrud />} /> */}
        </Routes>
      </div>
  );
}

export default AdminCrud;