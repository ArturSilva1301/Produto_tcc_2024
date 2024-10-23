const connection = require('../config/db');

// Função para cadastrar um novo professor
async function storeProfessor(request, response) {
    const { nome, email, password, codigo_escola } = request.body;
    const params = [nome, email, password, codigo_escola];
    const query = "INSERT INTO professores(nome, email, senha, codigo_escola) VALUES (?, ?, ?, ?);";

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao inserir professor:', err);
            return response.status(500).json({
                success: false,
                message: "Erro ao inserir professor",
                data: err,
            });
        } else {
            response.status(201).json({
                success: true,
                message: "Professor cadastrado com sucesso",
                data: results,
            });
        }
    });
}

// Função para autenticar um professor
async function authenticateProfessor(request, response) {
    const { email_professor, senha_professor, codigo_escola } = request.body;
    const query = "SELECT id, senha FROM professores WHERE email = ? AND codigo_escola = ?;";
    const params = [email_professor, codigo_escola];

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao buscar professor:', err);
            return response.status(500).json({
                success: false,
                message: "Erro ao buscar professor",
                data: err,
            });
        }

        if (results.length > 0 && results[0].senha === senha_professor) {
            response.status(200).json({
                success: true,
                message: "Professor autenticado com sucesso",
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
    storeProfessor,
    authenticateProfessor
};
