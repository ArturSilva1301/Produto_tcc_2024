const { Router } = require('express');
// Importa o 'Router' do módulo 'express' para criar um roteador modular de rotas.

const { postImagem, getImagem } = require('../controller/muralController');
// Importa a função 'postImagem' do controlador para processar uploads de imagens.

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

const router = Router();
// Cria uma instância do roteador para definir rotas específicas para operações relacionadas a imagens.

router.post('/update/postimg', postImagem); 
// Define a rota POST '/update/postimg' que usa 'postImagem' para processar o upload de imagens.

router.get("/imagens/:cod_escola", getImagem)

module.exports = router;
// Exporta o roteador para integração com o aplicativo principal.
