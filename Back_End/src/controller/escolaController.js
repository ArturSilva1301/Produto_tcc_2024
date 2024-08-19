const connection = require('../config/db');

async function storeSchool(request, response) {
    const { email, password } = request.body;

    const params = [email, password];
    
    const query = "INSERT INTO escola(email, senha) VALUES (?, ?);";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao inserir escola:', err);
            return response.status(500).json({
                success: false,
                message: "Erro ao inserir escola",
                data: err,
            });
        } 
        else {
            response.status(201).json({
                success: true,
                message: "Escola criada com sucesso",
                data: results,
            });
        }
    });
}

async function authenticateUser(request, response) {
    const { email_user, senha_user, cod_escola } = request.body;

    const query = "SELECT codigo_escola, senha FROM escola WHERE email = ? AND codigo_escola = ?;";
    const params = [email_user, cod_escola];

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar usuário",
                data: err,
            });
        }

        if (results.length > 0 && results[0].senha === senha_user) {
            response.status(200).json({
                success: true,
                message: "Usuário autenticado com sucesso",
                data: results,
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Credenciais inválidas",
            });
        }
    });
}

module.exports = {
    storeSchool,
    authenticateUser
};
