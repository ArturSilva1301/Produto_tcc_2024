const connection = require('../config/db');

async function storeResponsaveis(request, response) {
  let params = [
    request.body.email,
    request.body.senha,
    request.body.codigo_escola
  ];

  let query = "INSERT INTO responsaveis(email,senha,codigo_escola) VALUES(?,?,?);";

  connection.query(query, params, (err, results) => {
    if (err) {
      response
        .status(400)
        .json({
          success: false,
          message: "Erro ao cadastrar",
          data: err
        });
    } else {
      response
        .status(201)
        .json({
          success: true,
          message: "Cadastro realizado com sucesso",
          data: results
        });
    }
  });
}

module.exports = {
  storeResponsaveis
};