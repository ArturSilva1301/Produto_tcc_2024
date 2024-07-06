const connection = require('../config/db');
const dotenv = require('dotenv').config();

// LogIn / Buscar ID user (GET)

async function buscandoTDSDadosUser(request, response) {

    const query = "SELECT * FROM usuarios;";

    connection.query(query, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "deu get!!",
                data: results
            });

        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "deu merda no get!!",
                data: err
            })
        }
    })
}

async function buscandoDadosUser(request, response) {
    const params = Array(
        request.body.email_user
    )

    const query = "SELECT * FROM usuarios WHERE email = ?;";
        console.log(params)
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "deu get!!",
                data: results
            });

        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "deu merda no get!!",
                data: err
            })
        }
    })
}

async function getUser(request, response) {
    
    const params = Array(
        request.params.id
    )
    
    const query = "SELECT * FROM usuarios WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "deu get!!",
                data: results,
            });

        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "deu merda no get!!",
                data: err
            })
        }
    })
}


// (POST)

async function postUsuario(request, response) {
    const params = Array(
        request.body.email,
        request.body.password,
        request.body.codigo_escola
    )

    const query = "INSERT INTO usuarios(`email`, `senha`, `codigo_escola`) VALUES(?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "deu bom!!",
                data: results
            });

        } else {
            response
            .status(400)
            .json({
                sucess: false,
                message: "deu ruim!",
                data: err
            })
        }
    })
}

module.exports = {
    buscandoTDSDadosUser,
    buscandoDadosUser,
    getUser,
    postUsuario,
}