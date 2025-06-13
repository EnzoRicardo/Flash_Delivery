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
                id: usuario.id_usuario,
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


app.get('/api/categoria', function (req, res) {
    const query = 'SELECT * FROM categoria';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar categorias:', err);
            res.status(500).json({ error: 'Erro ao buscar categorias' });
        } else {
            res.status(200).json(results);
        }
    });
});


app.get('/api/refrigerantes', (req, res) => {
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
})

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
})

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