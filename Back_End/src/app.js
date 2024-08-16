const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const escolaRouter = require('./routes/escolaRouter');
const app = express();

dotenv.config();  // Carregar variáveis de ambiente

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());
app.use('/api', escolaRouter);  // A URL base deve ser '/api'

app.listen(app.get('port'), () => {
    console.log(`Servidor rodando na porta ${app.get('port')}`);
});

module.exports = app;
