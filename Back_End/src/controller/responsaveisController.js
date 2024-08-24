const connection = require('../config/db');
// Importa a configuração de conexão com o banco de dados.

async function storeResponsaveis(request, response) {
  const { nome, email, senha, codigo_escola } = request.body;
  // Desestrutura os dados do corpo da requisição.

  const query = "INSERT INTO responsavel(nome, email, senha, codigo_escola) VALUES (?, ?, ?,?);";
  // Define a consulta SQL para inserir um novo responsável na tabela 'responsavel'.
  const params = [nome, email, senha, codigo_escola];
  // Define os parâmetros da consulta com base nos dados recebidos.

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar responsável:', err);
      // Registra o erro no console se ocorrer um problema ao executar a consulta.
      response.status(400).json({
        success: false,
        message: "Erro ao cadastrar",
        data: err
      });
    } else {
      response.status(201).json({
        success: true,
        message: "Cadastro realizado com sucesso",
        data: results
      });
    }
  });
  // Executa a consulta e envia uma resposta JSON com sucesso ou erro.
}

async function authenticateResponsaveis(request, response) {
  const { nome, email, senha, codigo_escola } = request.body;
  // Desestrutura os dados do corpo da requisição.

  const query = "SELECT id, nome, senha, codigo_escola FROM responsavel WHERE email = ? AND codigo_escola = ?;";
  // Define a consulta SQL para buscar um responsável com o e-mail e código da escola fornecidos.
  const params = [email, codigo_escola];
  // Define os parâmetros da consulta com base nos dados recebidos.

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao buscar responsável:', err);
      // Registra o erro no console se ocorrer um problema ao executar a consulta.
      response.status(500).json({
        success: false,
        message: "Erro ao buscar responsável",
        data: err
      });
    } else if (results.length > 0 && results[0].senha === senha) {
      response.status(200).json({
        success: true,
        message: "Responsável autenticado com sucesso",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Credenciais inválidas"
      });
    }
  });
  // Executa a consulta e envia uma resposta JSON com sucesso, erro ou credenciais inválidas.
}

module.exports = {
  storeResponsaveis,
  authenticateResponsaveis
};
// Exporta as funções para serem usadas em outros módulos da aplicação.
