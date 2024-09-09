const router = require('express').Router();
// Cria uma instância do roteador usando o método 'Router()' do Express. 
// Esse roteador gerenciará as rotas relacionadas a escolas e usuários.

const { storeSchool, authenticateUser } = require('../controller/escolaController');
// Importa as funções 'storeSchool' e 'authenticateUser' do controlador 'escolaController'.
// Essas funções gerenciam o cadastro de escolas e a autenticação de usuários.

router.post('/store/school', storeSchool);
// Define a rota POST '/store/school' para processar o cadastro de novas escolas usando 'storeSchool'.

router.post('/User/BuscandoDadosUser', authenticateUser);
// Define a rota POST '/User/BuscandoDadosUser' para autenticar usuários (escolas) usando 'authenticateUser'.

module.exports = router;
// Exporta o roteador para que possa ser integrado ao aplicativo principal, permitindo o manejo das rotas configuradas.