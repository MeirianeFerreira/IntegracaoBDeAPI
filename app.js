const express = require('express');
const pool = require("./conexaobanco");
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para renderizar o formulário de cadastro
app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});

// Rota para salvar novos dados de cliente
app.post('/cadastro', function(req, res) {
    const { nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado } = req.body;

    const sql = 'INSERT INTO dadoscliente (nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    pool.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado], function(error, result) {
        if (error) throw error;
        res.redirect("listadeclientes");
    });
});

// Rota para listar todos os clientes
app.get('/listadeclientes', function(req, res) {
    const sql = "SELECT * FROM dadoscliente";
    pool.query(sql, function(error, result) {
        if (error) console.log(error);
        res.render("listadeclientes", { dadoscliente: result });
    });
});

// Rota para deletar um cliente
app.get('/delete-dadoscliente', function(req, res) {
    var codcliente = req.query.codcliente;

    if (!codcliente) {
        return res.status(400).send('ID do cliente não fornecido. Por favor, forneça um ID válido.');
    }

    console.log('ID do cliente para deletar:', codcliente);

    var sql = "DELETE FROM dadoscliente WHERE codcliente=?";
    pool.query(sql, [codcliente], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao deletar cliente');
        }
        res.redirect('/listadeclientes');
    });
});

// Rota para exibir o formulário de atualização de dados do cliente
app.get('/update-dadoscliente', function(req, res) {
    var codcliente = req.query.codcliente;
    console.log('codcliente recebido para update:', codcliente);

    var sql = "SELECT * FROM dadoscliente WHERE codcliente=?";
    pool.query(sql, [codcliente], function(error, result) {
        if (error) console.log(error);

        if (result && result.length > 0) {
            res.render("alterarcadastro", { dadoscliente: result[0] });
        } else {
            res.status(404).send('Cliente não encontrado');
        }
    });
});

// Rota POST para atualizar os dados do cliente no banco de dados
app.post('/update-dadoscliente', function(req, res) {
    const nome = req.body.nome;
    const sobrenome = req.body.sobrenome;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const codcliente = req.body.codcliente;
    
    console.log('codcliente recebido para atualização:', codcliente);

    const sql = "UPDATE dadoscliente SET nome=?, sobrenome=?, email=?, whatsapp=?, cep=?, logradouro=?, numero=?, complemento=?, bairro=?, estado=?, cidade=? WHERE codcliente=?";

    pool.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, cidade, estado, codcliente], function(error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send('Erro ao atualizar cliente');
        }
        res.redirect('/listadeclientes');
    });
});

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
