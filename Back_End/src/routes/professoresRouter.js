const router = require('express').Router();
const { storeProfessor, authenticateProfessor } = require('../controller/professoresController');

// Rota para cadastro de professor
router.post('/store/professor', storeProfessor);

// Rota para login de professor
router.post('/User/BuscandoDadosProfessor', authenticateProfessor);

module.exports = router;
