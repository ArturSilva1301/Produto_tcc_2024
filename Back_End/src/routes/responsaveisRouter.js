const express = require('express');
const router = express.Router();
// Importa o módulo 'express' e cria um roteador para definir rotas.

const { storeResponsaveis, authenticateResponsaveis } = require('../controller/responsaveisController');
// Importa funções do controlador para manipular o cadastro e autenticação dos responsáveis.

/**
 * @swagger
 * /tasks/list:
 *   get:
 *     summary: Cria as tarefas
 *     responses:
 *       200:
 *         description: Cria as tarefas no banco de dados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/cadastro', storeResponsaveis);
// Define uma rota POST '/cadastro' que usa 'storeResponsaveis' para registrar novos responsáveis.

router.post('/responsaveis/login', authenticateResponsaveis);
// Define uma rota POST '/login' que usa 'authenticateResponsaveis' para autenticar responsáveis.

module.exports = router;
// Exporta o roteador para ser utilizado em outras partes da aplicação.