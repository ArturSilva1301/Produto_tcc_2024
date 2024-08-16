const router = require('express').Router();
const { storeSchool, authenticateUser } = require('../controller/escolaController');

// Endpoint para cadastrar escola
router.post('/store/school', storeSchool);

// Endpoint para autenticar usuário (escola)
router.post('/User/BuscandoDadosUser', authenticateUser);

module.exports = router;
