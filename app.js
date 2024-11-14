const conexao = require('./conexaobanco'); // Arquivo conexaobanco.js

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/cadastro', (req, res) => {
    res.render('cadastro', { titulo: 'Cadastro' });
  });

  // Novas rotas
app.get('/listadeclientes', (req, res) => {
    res.render('listadeclientes', { titulo: 'Lista' });
  });
  app.get('/alterarcadastro', (req, res) => {
    res.render('alterarcadastro', { titulo: 'Alteração' });
  });

  app.post('cadastro', function(req, res) {
 
    const name= req.body.name;
    const sobrenome =req.body.sobrenome;
    const email = req.body.email;
    const whatsapp = req.body.whatsapp;
    const cep = req.body.cep;
    const logradouro = req.body.logradouro;
    const numero = req.body.numero;
    const complemento = req.body.complemento;
    const bairro = req.body.bairro;
    const estado = req.body.estado;
    const cidade = req.body.cidade;
    
  
    const sql = 'INSERT INTO cadastro (nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, estado, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    conexao.query(sql, [nome, sobrenome, email, whatsapp, cep, logradouro, numero, complemento, bairro, estado, cidade], (err, result) => {
      if (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).send('Erro ao cadastrar usuário.');
        return;
      }
      
    });
  });

  //app.get('/cadastro', function(req, res){
    //conexao.connect(function(error){
       // if (error) console.log(error);
 
        //var sql = "select * from dadoscliente";
        //conexao.query(sql, function(error, result){
            //if(error) console.log(error);
            //res.render('cadastroleitura', { pesquisadores: result });
        //})
    //})
//})
  
  // Iniciar o servidor
  const PORT = process.env.PORT || 9000
  ;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
  
  