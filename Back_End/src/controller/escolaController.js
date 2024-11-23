const connection = require('../config/db');
// Importa a configuração de conexão com o banco de dados.

async function storeSchool(request, response) {
    const { nome, email, password } = request.body;
    // Desestrutura os dados do corpo da requisição para obter o e-mail e a senha da escola.

    const params = [nome, email, password];
    // Define os parâmetros da consulta com os dados recebidos.

    const query = "INSERT INTO escola(nome, email, senha) VALUES (?, ?, ?);";
    // Define a consulta SQL para inserir uma nova escola na tabela 'escola'.

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao inserir escola:', err);
            // Registra o erro no console se ocorrer um problema ao executar a consulta.
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
    // Executa a consulta e envia uma resposta JSON com sucesso ou erro.
}

async function authenticateUser(request, response) {
    const { email_user, senha_user, cod_escola } = request.body;
    // Desestrutura os dados do corpo da requisição para obter o e-mail, a senha e o código da escola do usuário.

    const query = "SELECT codigo_escola, senha FROM escola WHERE email = ? AND  codigo_escola = ?;";
    // Define a consulta SQL para buscar uma escola com base no e-mail e código da escola fornecidos.
    const params = [email_user, cod_escola];
    // Define os parâmetros da consulta com os dados recebidos.

    connection.query(query, params, (err, results) => {
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
    // Executa a consulta e envia uma resposta JSON com sucesso, erro ou credenciais inválidas.
}

async function buscarDadosEscola(request, response) {   
    const { cod_escola } = request.params;
    // Desestrutura os dados do corpo da requisição para obter o e-mail, a senha e o código da escola do usuário.

    const query = "SELECT * FROM escola WHERE codigo_escola = ?;";
    // Define a consulta SQL para buscar uma escola com base no e-mail e código da escola fornecidos.
    const params = [cod_escola];
    // Define os parâmetros da consulta com os dados recebidos.

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
    // Executa a consulta e envia uma resposta JSON com sucesso, erro ou credenciais inválidas.
}

module.exports = {
    storeSchool,
    authenticateUser,
    buscarDadosEscola
};
// Exporta as funções para serem usadas em outros módulos da aplicação.