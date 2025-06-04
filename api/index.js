const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

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
            res.status(200).json({
                message: 'Login realizado com sucesso',
                token: 'fake-jwt-token', // substitua por JWT real se quiser segurança
                nome: usuario.nome,
                email: usuario.email,
                id: usuario.id_usuario
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
