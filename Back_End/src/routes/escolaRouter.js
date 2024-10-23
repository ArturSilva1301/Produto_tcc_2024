const router = require('express').Router();
// Cria uma instância do roteador usando o método 'Router()' do Express. 
// Esse roteador gerenciará as rotas relacionadas a escolas e usuários.

const { storeSchool, authenticateUser } = require('../controller/escolaController');
// Importa as funções 'storeSchool' e 'authenticateUser' do controlador 'escolaController'.
// Essas funções gerenciam o cadastro de escolas e a autenticação de usuários.

/**
 * @swagger
 * /store/school:
 *   post:
 *     summary: A função storeSchool recebe uma requisição contendo um e-mail e uma senha, insere esses dados na tabela "escola" do banco de dados MySQL e retorna uma resposta JSON indicando o sucesso ou erro da operação
 *     responses:
 *       200:
 *         description: A função storeSchool é responsável por cadastrar uma nova escola no banco de dados. Ela utiliza o método POST para receber os dados no corpo da requisição, especificamente o e-mail e a senha da escola. Esses valores são desestruturados e armazenados em variáveis. Em seguida, a função prepara uma consulta SQL INSERT INTO para adicionar esses dados na tabela escola.A consulta é executada com a ajuda da conexão ao banco de dados MySQL, utilizando uma função de callback que verifica se ocorreu um erro durante a inserção. Se houver um erro, ele é capturado, registrado no console, e a resposta HTTP retorna um status 500, indicando falha, com uma mensagem e o erro como dados adicionais. Se a operação for bem-sucedida, a função retorna um status 201 (Created), com uma mensagem de sucesso e os resultados da inserção.Essa função é usada para criar novas entradas na tabela escola, gerando uma resposta adequada para a API, seja de sucesso ou de erro.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/store/school', storeSchool);
// Define a rota POST '/store/school' para processar o cadastro de novas escolas usando 'storeSchool'.

/**
 * @swagger
 * /User/BuscandoDadosUser:
 *   post:
 *     summary: A função authenticateUser valida as credenciais de um usuário buscando a escola correspondente ao e-mail e código fornecidos no banco de dados, e compara a senha para autenticar o usuário.
 *     responses:
 *       200:
 *         description: A função authenticateUser é usada para verificar as credenciais de login de um usuário. Ela começa desestruturando os dados do corpo da requisição, que incluem o e-mail (email_user), a senha (senha_user), e o código da escola (cod_escola). Em seguida, ela monta uma consulta SQL que busca na tabela escola uma escola com o e-mail e código fornecidos, retornando o código da escola e a senha associada. Os parâmetros da consulta são definidos com os dados recebidos e a função executa a consulta SQL utilizando a conexão com o banco de dados MySQL. Se houver um erro ao executar a consulta, ele é registrado no console e a função responde com um status 500, indicando um erro de servidor. Se a consulta encontrar uma escola e a senha correspondente for igual à senha fornecida pelo usuário, a função responde com um status 200 (OK), indicando que o usuário foi autenticado com sucesso. Caso contrário, se a escola não for encontrada ou a senha estiver incorreta, a função retorna um status 400, indicando credenciais inválidas. Essa função permite a autenticação de usuários com base em suas credenciais de login, enviando uma resposta JSON apropriada, seja em caso de sucesso ou de falha na autenticação.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/User/BuscandoDadosUser', authenticateUser);
// Define a rota POST '/User/BuscandoDadosUser' para autenticar usuários (escolas) usando 'authenticateUser'.

module.exports = router;
// Exporta o roteador para que possa ser integrado ao aplicativo principal, permitindo o manejo das rotas configuradas.