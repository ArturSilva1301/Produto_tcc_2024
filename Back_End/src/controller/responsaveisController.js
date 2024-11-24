const connection = require('../config/db');
// Importa a configuração de conexão com o banco de dados.

async function storeResponsaveis(request, response) {
  const { nome, email, senha, codigo_escola } = request.body;

  // Extrai os dados enviados na requisição.
  const query = "INSERT INTO responsavel(nome, email, senha, codigo_escola) VALUES (?, ?, ?,?);";
  // Define a consulta SQL para inserir um novo registro na tabela 'responsavel'.

  const params = [nome, email, senha, codigo_escola];
  // Define os valores para substituir os placeholders (?) na consulta.

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar responsável:', err);
      // Caso ocorra um erro ao executar a consulta, registra no console e envia a resposta com status 400 (erro).
      response.status(400).json({
        success: false,
        message: "Erro ao cadastrar",
        data: err
      });
    } else {
      // Se a consulta for bem-sucedida, envia uma resposta com status 201 (criado).
      response.status(201).json({
        success: true,
        message: "Cadastro realizado com sucesso",
        data: results
      });
    }
  });
  // Executa a consulta SQL e trata a resposta conforme o resultado.
}

async function authenticateResponsaveis(request, response) {
  const { email, senha, cod_escola } = request.body;
  // Extrai os dados de autenticação enviados na requisição.

  const params = [email, cod_escola];
  // Define os valores para a consulta de autenticação.

  const query = "SELECT id, nome, senha, codigo_escola FROM responsavel WHERE email = ? AND codigo_escola = ?;";
  // Define a consulta SQL para buscar um responsável pelo email e código da escola.

  connection.query(query, params, (err, results) => {
    if (results && results[0].senha === senha) {
      // Verifica se o usuário foi encontrado e se a senha está correta. Se sim, envia uma resposta de sucesso.
      response.status(201).json({
        success: true,
        message: "Responsável autenticado com sucesso",
        data: results,
      });
    } else {
      // Caso contrário, envia uma resposta de erro.
      response.status(400).json({
        success: false,
        message: "Erro ao buscar responsável",
        data: err,
      });
    }
  });
  // Executa a consulta SQL para autenticação e responde com sucesso ou erro.
}

async function buscarDadosResp(request, response) {
  const { id } = request.params;

  const params = [id];

  const query = "SELECT * FROM responsavel WHERE id = ?;";

  connection.query(query, params, (err, results) => {
    if (err) {
      response.status(400).json({
        success: false,
        message: "Credenciais inválidas",
      });

    } else {
      response.status(200).json({
        success: true,
        message: "Usuário autenticado com sucesso",
        data: results,
      });
    }
  });
}

module.exports = {
  storeResponsaveis,
  authenticateResponsaveis,
  buscarDadosResp
};
// Exporta as funções para serem utilizadas em outras partes da aplicação.
