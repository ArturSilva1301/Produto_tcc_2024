const express = require('express');
const router = express.Router();

const { storeResponsaveis } = require('../controllers/responsaveisController');

router.post('/cadastro', storeResponsaveis); // Remova o prefixo /api

module.exports = router;