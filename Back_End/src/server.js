const app = require('./app');
// Importa a instância do servidor Express configurada no arquivo 'app.js'.

const port = app.get('port');
// Obtém o número da porta configurada para o servidor.

app.listen(port, () => console.log(`Rodando na porta ${port}`));
// Inicia o servidor na porta especificada e exibe uma mensagem de confirmação no console.
