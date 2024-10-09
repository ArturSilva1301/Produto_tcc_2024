const app = require('./app');
// Importa a instância do servidor Express configurada no arquivo 'app.js'.

const port = app.get('port');
// Obtém o número da porta configurada para o servidor.


const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
 
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3008" }],
    },
    apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

app.listen(port, () => console.log(`Rodando na porta ${port}`));
// Inicia o servidor na porta especificada e exibe uma mensagem de confirmação no console.

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
