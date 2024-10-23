const { Router } = require('express');
// Importa o 'Router' do módulo 'express' para criar um roteador modular de rotas.

const { postImagem, getImagem } = require('../controller/muralController');
// Importa a função 'postImagem' do controlador para processar uploads de imagens.

const router = Router();
// Cria uma instância do roteador para definir rotas específicas para operações relacionadas a imagens.

/**
 * @swagger
 * /update/postimg:
 *   post:
 *     summary: A função postImagem faz o upload de uma imagem enviada por um usuário, atribui um nome único ao arquivo, move a imagem para um diretório no servidor e armazena o nome do arquivo junto com o código da escola no banco de dados. A resposta é JSON, indicando sucesso ou erro.
 *     responses:
 *       200:
 *         description: A função postImagem gerencia o processo de upload de uma imagem e a sua associação a uma escola específica. Inicialmente, ela verifica se a requisição contém um arquivo de imagem. Se não houver um arquivo enviado, a função responde com um status 400, indicando que o upload falhou, e retorna uma mensagem de erro. Se uma imagem for enviada, a função captura o arquivo da requisição e gera um nome de arquivo único, combinando um timestamp atual e a extensão original da imagem. Este nome único ajuda a evitar conflitos de nomes de arquivos. A função então tenta mover o arquivo de imagem para um diretório específico no servidor (uploads). Se o arquivo for movido com sucesso, a função constrói um array params com o nome da imagem e o código da escola associado. Em seguida, ela prepara uma consulta SQL INSERT INTO para inserir esses valores na tabela imagem.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.post('/update/postimg', postImagem); 
// Define a rota POST '/update/postimg' que usa 'postImagem' para processar o upload de imagens.

/**
 * @swagger
 * /imagens/:cod_escola:
 *   get:
 *     summary: A função getImagem busca a imagem associada a uma escola com base no código da escola fornecido e retorna uma resposta JSON com sucesso ou erro.
 *     responses:
 *       200:
 *         description: A função getImagem tem o objetivo de recuperar a imagem associada a uma escola a partir do código da escola (cod_escola). Ela extrai esse código dos parâmetros da requisição e o armazena em um array params. Em seguida, uma consulta SQL SELECT é preparada para buscar a coluna imagem da tabela imagem, onde o valor de codigo_escola corresponde ao código da escola fornecido. A função então executa essa consulta SQL através da conexão MySQL. Se a consulta for bem-sucedida e houver um resultado, a função retorna uma resposta HTTP com status 200, indicando sucesso, e inclui os resultados da consulta no corpo da resposta. Caso ocorra um erro ou se a consulta falhar, a função responde com status 400, indicando que houve um problema ao tentar buscar a imagem, e também envia o erro ocorrido. Essa função serve para obter imagens associadas a escolas com base no código da escola, facilitando o processo de recuperação de imagens no banco de dados e respondendo de forma adequada em caso de sucesso ou erro.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

router.get("/imagens/:cod_escola", getImagem)

module.exports = router;
// Exporta o roteador para integração com o aplicativo principal.
