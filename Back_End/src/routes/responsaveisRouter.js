const express = require('express');
const router = express.Router();
// Importa o módulo 'express' e cria um roteador para definir rotas.

const { storeResponsaveis, authenticateResponsaveis, buscarDadosResp } = require('../controller/responsaveisController');
// Importa funções do controlador para manipular o cadastro e autenticação dos responsáveis.

/**
 * @swagger
 * /cadastro:
 *   post:
 *     summary: A função storeResponsaveis cadastra um novo responsável no banco de dados, inserindo nome, e-mail, senha e código da escola na tabela responsavel, e retorna uma resposta JSON indicando sucesso ou erro.
 *     responses:
 *       200:
 *         description: A função storeResponsaveis é responsável por inserir um novo registro de responsável no banco de dados. Ela começa extraindo os dados enviados no corpo da requisição, que incluem o nome, e-mail, senha e código da escola. Esses valores são utilizados para montar uma consulta SQL INSERT INTO, que adiciona um novo responsável à tabela responsavel. Os parâmetros da consulta são definidos com os dados recebidos (nome, e-mail, senha e código da escola) e a consulta SQL é então executada utilizando a conexão MySQL. Caso ocorra um erro durante a execução da consulta, a função registra o erro no console e retorna uma resposta com o status 400, indicando que houve um problema ao tentar cadastrar o responsável, incluindo o erro nos dados da resposta. Se a inserção for bem-sucedida, a função responde com o status 201 (Created), indicando que o cadastro foi realizado com sucesso, e retorna os resultados da operação. Dessa forma, a função gerencia o processo de adicionar novos responsáveis ao banco de dados e responde adequadamente com uma mensagem de sucesso ou erro.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/cadastro', storeResponsaveis);
// Define uma rota POST '/cadastro' que usa 'storeResponsaveis' para registrar novos responsáveis.

/**
 * @swagger
 * /responsaveis/login:
 *   post:
 *     summary: A função authenticateResponsaveis verifica as credenciais de um responsável (email, senha, e código da escola) no banco de dados, autenticando o responsável se as informações estiverem corretas e respondendo com uma mensagem de erro se não forem.
 *     responses:
 *       200:
 *         description: A função authenticateResponsaveis tem o objetivo de autenticar responsáveis vinculados a uma escola. Ela começa desestruturando o corpo da requisição para extrair o e-mail, a senha, e o código da escola (cod_escola). Esses valores são então usados para montar uma consulta SQL que busca na tabela responsavel os dados correspondentes ao e-mail e ao código da escola fornecidos. Os parâmetros da consulta são definidos com os dados recebidos, e a consulta SQL é preparada para selecionar o ID, nome, senha e código da escola do responsável. A função então executa essa consulta através da conexão com o banco de dados MySQL. 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/responsaveis/login', authenticateResponsaveis);
// Define uma rota POST '/login' que usa 'authenticateResponsaveis' para autenticar responsáveis.

router.get('/responsaveis/dados/:id', buscarDadosResp);

module.exports = router;
// Exporta o roteador para ser utilizado em outras partes da aplicação.