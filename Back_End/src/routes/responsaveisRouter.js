const express = require('express');
const router = express.Router();

const { storeResponsaveis, authenticateResponsaveis } = require('../controller/responsaveisController');

router.post('/cadastro', storeResponsaveis);
router.post('/login', authenticateResponsaveis); // Endpoint para login

module.exports = router;
