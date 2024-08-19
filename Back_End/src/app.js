const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const escolaRouter = require('./routes/escolaRouter');
const app = express();

dotenv.config();  // Carregar variáveis de ambiente

app.set('port', process.env.PORT || 3010);
app.use(cors());
app.use(express.json());
app.use('/api', escolaRouter);  // A URL base deve ser '/api'

module.exports = app;