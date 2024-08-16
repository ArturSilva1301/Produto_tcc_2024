const connection = require('../config/db');

async function storeResponsaveis(request, response) {
  const { email, senha, codigo_escola } = request.body;

  const query = "INSERT INTO responsavel(email, senha, codigo_escola) VALUES (?, ?, ?);";
  const params = [email, senha, codigo_escola];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar responsável:', err);
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
}

async function authenticateResponsaveis(request, response) {
  const { email, senha, codigo_escola } = request.body;

  const query = "SELECT id, senha, codigo_escola FROM responsavel WHERE email = ? AND codigo_escola = ?;";
  const params = [email, codigo_escola];

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error('Erro ao buscar responsável:', err);
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
}

module.exports = {
  storeResponsaveis,
  authenticateResponsaveis
};
