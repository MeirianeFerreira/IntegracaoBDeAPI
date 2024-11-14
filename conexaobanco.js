const mysql = require('mysql');

// Variável que armazena a conexão
const connectBanco = mysql.createConnection({
  host: 'localhost', // Define o endereço do servidor MySQL
  user: 'root', // Nome de usuário para autenticação no banco de dados
  password: '', // Senha correspondente ao usuário do MySQL
  database: 'cadastrohappylife'
});

conexaobanco.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Exporta a conexão do banco de dados para ser utilizada em outros arquivos do projeto
module.exports = conexaobanco;
