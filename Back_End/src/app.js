const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const escolaRouter = require('./routes/escolaRouter');
const app = express();

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());
app.use('/api', escolaRouter);

module.exports = app;