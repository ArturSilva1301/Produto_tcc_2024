const express = require('express');
// Importa o módulo 'express' para criar a aplicação web.
const dotenv = require('dotenv');
// Importa o módulo 'dotenv' para carregar variáveis de ambiente a partir de um arquivo '.env'.
const cors = require('cors');
// Importa o módulo 'cors' para permitir o acesso a recursos entre diferentes domínios.
const path = require('path');
// Importa o módulo 'path' para manipular caminhos de arquivos e diretórios.
const fs = require('fs');
// Importa o módulo 'fs' para trabalhar com o sistema de arquivos (leitura/escrita de arquivos).
const fileupload = require('express-fileupload');
// Importa o módulo 'express-fileupload' para lidar com upload de arquivos na aplicação.
const escolaRouter = require('./routes/escolaRouter');
// Importa o roteador 'escolaRouter' que contém as rotas relacionadas à entidade 'escola'.
const responsaveisRouter = require('./routes/responsaveisRouter');
// Importa o roteador 'responsaveisRouter' que contém as rotas relacionadas à entidade 'responsáveis'.
const muralRouter = require('./routes/muralRouter')
// Importa o roteador 'muralRouter' que contém as rotas relacionadas ao 'mural'.
const app = express();
// Cria uma instância da aplicação 'express'.

dotenv.config();  
// Carrega as variáveis de ambiente a partir do arquivo '.env' para o processo atual.
app.set('port', process.env.PORT || 3008);
// Define a porta em que a aplicação vai rodar, utilizando a variável de ambiente 'PORT' ou 3008 como padrão.

app.use(cors());
// Habilita o CORS (Cross-Origin Resource Sharing) para permitir que recursos sejam acessados por diferentes domínios.
app.use(express.json());
// Configura o servidor para entender requisições com o corpo em formato JSON.
app.use(fileupload());
// Habilita a funcionalidade de upload de arquivos na aplicação.
app.use('/uploads', express.static(path.join(__dirname, "uploads")))
// Configura o servidor para servir arquivos estáticos a partir da pasta 'uploads' no caminho '/uploads'.
app.use('/api', escolaRouter);  
// Usa o roteador 'escolaRouter' para todas as rotas que começam com '/api'.
app.use('/api', responsaveisRouter);  
// Usa o roteador 'responsaveisRouter' para todas as rotas que começam com '/api'.
app.use('/api', muralRouter);  
// Usa o roteador 'muralRouter' para todas as rotas que começam com '/api'.

module.exports = app;
// Exporta a instância do aplicativo para ser utilizada em outros arquivos (como o arquivo que inicia o servidor).