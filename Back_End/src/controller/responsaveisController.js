const connection = require('../config/db');

async function storeResponsaveis(request, response) {
    let params = Array(
        request.body.email,
        request.body.password
    );

    let query = "INSERT INTO responsaveis(email,senha) VALUES(?,?);";

    connection.query(query, params, (err, results) => {
        console.log(err, results);
        if (results) {
            response
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "Sem Sucesso",
                    data: err
                })
        }
    })
}

module.exports = {
    storeResponsaveis
}