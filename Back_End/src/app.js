const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fileupload = require('express-fileupload');

const escolaRouter = require('./routes/escolaRouter');
const responsaveisRouter = require('./routes/responsaveisRouter');
const app = express();

dotenv.config();  // Carregar variáveis de ambiente

app.set('port', process.env.PORT || 3010);
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use('/api', escolaRouter);  // A URL base deve ser '/api'
app.use('/api', responsaveisRouter);  // A URL base deve ser '/api'

module.exports = app;