import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProdutoCrud from './ProdutoCrud';


function AdminCrud() {
  return (
      <div>
        <nav>
          <Link to="/produto-crud"><h2>Adicionar Produto</h2></Link>
          <Link to="/categoria-crud"><h2>Adicionar Categoria</h2></Link>
          <Link to="/usuario"><h2>Adicionar Usuário</h2></Link>
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