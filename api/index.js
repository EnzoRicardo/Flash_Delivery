const express = require('express');
const cors = require('cors');
const connection = require('./db');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 8080;
const SECRET_KEY = 'flash';
const multer = require('multer');

app.use(express.json());
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//login de usuario
app.post('/api/login', function (req, res) {
    const { email, senha } = req.body;

    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao verificar login:', err);
            return res.status(500).json({ error: 'Erro interno no login' });
        }

        if (results.length > 0) {
            const usuario = results[0];

            const isAdmin = usuario.email === 'admin' && usuario.senha === 'admin';
            
            const token = jwt.sign(
                {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                isAdmin: isAdmin
                },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login realizado com sucesso',
                token: token, 
            });
        } else {
            res.status(401).json({ message: 'Email ou senha incorretos' });
        }
    });
});



app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});

app.post('/api/admin-produto', function (req, res) {
    const query = 'INSERT INTO produtos (id_produto, nome_produto, preco, qtda_estoque, fk_id_categoria) VALUES (?, ?, ?, ?, ?)';
    const { id_produto, nome_produto, preco, qtda_estoque, fk_id_categoria } = req.body;
    
    connection.query(query, [id_produto, nome_produto, preco, qtda_estoque, fk_id_categoria], (err, results) => {
        if (err) {
            console.error('Erro ao inserir produto:', err);
            res.status(500).json({ error: 'Erro interno ao salvar produto' });
        } else {
            console.log('Produto inserido com sucesso!', results);
            res.status(201).json({ message: 'Produto criado com sucesso!' });
        }
    }
    );   
})

app.post('/api/admin-categoria', function (req, res) {
    const query = 'INSERT INTO categoria (id_categoria, nome_categoria) VALUES (?, ?)';
    const { id_categoria, nome_categoria } = req.body;

    connection.query(query, [id_categoria, nome_categoria], (err, results) => {
        if (err) {
            console.error('Erro ao inserir categoria:', err);
            res.status(500).json({ error: 'Erro interno ao salvar categoria' });
        } else {
            console.log('Categoria inserida com sucesso!', results);
            res.status(201).json({ message: 'Categoria criada com sucesso!' });
        }
    });   
})

// USUARIO CRUD
app.get('/api/usuario', function (req, res) {
    const query = 'SELECT * FROM usuarios';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro interno ao buscar usuários' });
        } else {
            console.log('Usuários encontrados:', results);
            res.status(200).json(results);
        }
    });
});

app.delete('/api/usuario/:id', (req, res) => {
  const idUsuario = req.params.id;
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  connection.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('Erro ao deletar usuario:', err);
      return res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso!' });
  });
});

//inserir novo usuario
app.post('/api/usuario', function (req, res) {
    const { nome, email, cpf, telefone, cep, complemento, endereco, senha } = req.body;

    const query = 'INSERT INTO usuarios ( nome, email, cpf, telefone, cep, complemento, endereco, senha) VALUES (?, ?, ?,?,?,?,?, ?)';
    connection.query(query, [ nome, email, cpf, telefone, cep, complemento, endereco, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro interno ao salvar usuário' });
        } else {
            console.log('Usuário inserido com sucesso!', results);
            res.status(201).json({ message: 'Usuário criado com sucesso!' });
        }
    });
});

app.put('/api/usuario/:id', (req, res) => {
  const idUsuario = req.params.id;
  const { nome, email, cpf, telefone, cep, complemento, endereco, senha } = req.body;
  const query = `
    UPDATE usuarios 
    SET nome = ?, email = ?, cpf = ?, telefone = ?, cep = ?, complemento = ?, endereco = ?, senha = ?
    WHERE id = ?
  `;
  connection.query(
    query,
    [nome, email, cpf, telefone, cep, complemento, endereco, senha, idUsuario],
    (err, results) => {
      if (err) {
        console.error('Erro ao atualizar usuario:', err);
        return res.status(500).json({ error: 'Erro ao atualizar usuario' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
    }
  );
});
  

// PRODUTO CRUD
app.post('/api/produtos', upload.single('imagem'), (req,res) => {
    const { nome_produto, preco, volume, estoque, categoria } = req.body;
    const imagem = req.file ? req.file.buffer : null;

    const query = 'INSERT INTO produtos (nome_produto, preco, volume, qtda_estoque, fk_id_categoria, imagem) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [nome_produto, preco, volume, estoque, categoria, imagem], (err, results) => {
        if (err) {
        console.error('Erro ao inserir produto:', err);
        return res.status(500).json({ error: 'Erro ao salvar produto' });
      }

      res.status(201).json({ message: 'Produto inserido com sucesso!' });
    })
});

app.get('/api/produtoslist', (req, res) => {
  const query = 'SELECT * FROM produtos';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }

    // CONVERSÃO PARA BASE64
    const produtosComImagens = results.map(produto => {
      const imagemBase64 = produto.imagem
        ? `data:image/jpeg;base64,${produto.imagem.toString('base64')}`
        : '';
      return {
        ...produto,
        imagem: imagemBase64
      };
    });

    res.json(produtosComImagens);
  });
});

app.delete('/api/produtos/:id', (req, res) => {
    const idProduto = req.params.id;

    const query = 'DELETE FROM produtos WHERE id_produto = ?';

    connection.query(query, [idProduto], (err, results) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            return res.status(500).json({error: 'Erro ao deletar produto'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Produto não encontrado'});
        }

        res.status(200).json({message : 'Produto deletado com sucesso!'});
    });
});

app.put('/api/produtos/:id', upload.single('imagem'), (req, res) => {
  const idProduto = req.params.id;
  const { nome_produto, preco, volume, qtda_estoque, fk_id_categoria } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  let query, params;
  if (imagem) {
    query = `
      UPDATE produtos 
      SET nome_produto = ?, preco = ?, volume = ?, qtda_estoque = ?, fk_id_categoria = ?, imagem = ?
      WHERE id_produto = ?
    `;
    params = [nome_produto, preco, volume, qtda_estoque, fk_id_categoria, imagem, idProduto];
  } else {
    query = `
      UPDATE produtos 
      SET nome_produto = ?, preco = ?, volume = ?, qtda_estoque = ?, fk_id_categoria = ?
      WHERE id_produto = ?
    `;
    params = [nome_produto, preco, volume, qtda_estoque, fk_id_categoria, idProduto];
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar produto:', err);
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso!' });
  });
});

// REFRI
app.get('/api/produtosCards', (req, res) => {
  const categoriaId = req.query.categoria;
  const query = 'SELECT * FROM produtos WHERE fk_id_categoria = ?';

  connection.query(query, [categoriaId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({ error: 'Erro ao buscar produtos' });
    }

    const produtosComImagem = results.map(produto => {
      const imagemBase64 = produto.imagem
        ? `data:image/jpeg;base64,${produto.imagem.toString('base64')}`
        : '';
      return {
        ...produto,
        imagem: imagemBase64
      };
    });

    res.json(produtosComImagem);
  });
});

// CATEGORIA CRUD

app.post('/api/categorias', upload.single('imagem'), (req,res) => {
    const { nome_categoria } = req.body;
    const imagem = req.file ? req.file.buffer : null;

    const query = 'INSERT INTO categoria (nome_categoria, imagem) VALUES (?, ?)';

    connection.query(query, [nome_categoria, imagem], (err, results) => {
        if (err) {
        console.error('Erro ao inserir categoria:', err);
        return res.status(500).json({ error: 'Erro ao salvar categoria' });
      }

      res.status(201).json({ message: 'Categoria inserido com sucesso!' });
    })
});

app.get('/api/categoria', (req, res) => {
  const query = 'SELECT * FROM categoria';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar categorias:', err);
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }

    const categoriasComImagens = results.map(categoria => {
      const imagemBase64 = categoria.imagem
        ? `data:image/jpeg;base64,${categoria.imagem.toString('base64')}`
        : '';
      return {
        ...categoria,
        imagem: imagemBase64
      };
    });

    res.json(categoriasComImagens);
  });
});

app.get('/api/categorialist', (req, res) => {
  const query = 'SELECT * FROM categoria';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar categorias:', err);
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }

    const categoriasComImagens = results.map(categoria => {
      const imagemBase64 = categoria.imagem
        ? `data:image/jpeg;base64,${categoria.imagem.toString('base64')}`
        : '';
      return {
        ...categoria,
        imagem: imagemBase64
      };
    });

    res.json(categoriasComImagens);
  });
});

app.get('/api/categorias/:id', (req, res) => {
    const idCategoria = req.params.id;

    const query = 'SELECT * FROM categoria WHERE id_categoria = ?';

    connection.query(query, [idCategoria], (err, results) => {
        if (err) {
            console.error('Erro ao buscar categoria:', err);
            return res.status(500).json({error: 'Erro ao buscar categoria'});
        }

        if (results.length === 0) {
            return res.status(404).json({error: 'Categoria não encontrada'});
        }
        res.status(200).json(results[0]);       
        
    });
});

app.delete('/api/categorias/:id', (req, res) => {
    const idCategoria = req.params.id;

    const query = 'DELETE FROM categoria WHERE id_categoria = ?';

    connection.query(query, [idCategoria], (err, results) => {
        if (err) {
            console.error('Erro ao deletar categoria:', err);
            return res.status(500).json({error: 'Erro ao deletar categoria'});
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({error: 'Categoria não encontrada'});
        }

        res.status(200).json({message : 'Categoria deletada com sucesso!'});
    });
});


app.put('/api/categoria/:id', upload.single('imagem'), (req, res) => {
  const idCategoria = req.params.id;
  const { nome_categoria } = req.body;
  const imagem = req.file ? req.file.buffer : null;

  let query, params;
  if (imagem) {
    query = `
      UPDATE categoria 
      SET nome_categoria = ?, imagem = ?
      WHERE id_categoria = ?
    `;
    params = [nome_categoria, imagem, idCategoria];
  } else {
    query = `
      UPDATE categoria 
      SET nome_categoria = ?
      WHERE id_categoria = ?
    `;
    params = [nome_categoria, idCategoria];
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao atualizar categoria:', err);
      return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }
    res.status(200).json({ message: 'Categoria atualizada com sucesso!' });
  });
});


//salva os pedidos no MYSQL
app.post('/api/pedido', (req, res) => {
  const { id_usuario, total, itens } = req.body;

  const pedidoQuery = 'INSERT INTO pedidos (id_usuario, total) VALUES (?, ?)';
  connection.query(pedidoQuery, [id_usuario, total], (err, result) => {
    if (err) {
      console.error('Erro ao criar pedido:', err);
      return res.status(500).json({ error: 'Erro ao criar pedido' });
    }

    const id_pedido = result.insertId;

    const itensValues = itens.map(item => [
      id_pedido,
      item.id_produto,
      item.nome_produto,
      item.quantidade,
      item.preco_unitario
    ]);

    const itensQuery = 'INSERT INTO itens_pedido (id_pedido, id_produto, nome_produto, quantidade, preco_unitario) VALUES ?';

    connection.query(itensQuery, [itensValues], (err, result) => {
      if (err) {
        console.error('Erro ao inserir itens do pedido:', err);
        return res.status(500).json({ error: 'Erro ao inserir itens do pedido' });
      }

      res.status(201).json({ message: 'Pedido finalizado com sucesso!' });
    });
  });
});

//pega os dados salvos no MYSQL para retornar no crud
app.get('/api/pedidos', (req, res) => {
  const sqlPedidos = `
    SELECT p.id, p.total, p.data_pedido, u.nome AS nome_usuario
    FROM pedidos p
    JOIN usuarios u ON p.id_usuario = u.id
    ORDER BY p.data_pedido DESC
  `;

  connection.query(sqlPedidos, (err, pedidos) => {
    if (err) {
      console.error('Erro ao buscar pedidos:', err);
      return res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }

    const pedidoIds = pedidos.map(p => p.id);
    if (pedidoIds.length === 0) {
      return res.json([]);  
    }

    const sqlItens = `
      SELECT i.*, p.id AS pedido_id
      FROM itens_pedido i
      JOIN pedidos p ON i.id_pedido = p.id
      WHERE p.id IN (?)
    `;

    connection.query(sqlItens, [pedidoIds], (err, itens) => {
      if (err) {
        console.error('Erro ao buscar itens dos pedidos:', err);
        return res.status(500).json({ error: 'Erro ao buscar itens' });
      }

      const pedidosComItens = pedidos.map(pedido => {
        return {
          ...pedido,
          itens: itens.filter(item => item.pedido_id === pedido.id)
        };
      });

      res.json(pedidosComItens);
    });
  });
});
