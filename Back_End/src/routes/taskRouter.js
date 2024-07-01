const { Router } = require('express');
const router = Router();

const { buscandoTDSDadosUser, buscandoDadosUser, postUsuario, getUser, } = require('../controller/taskController');

// POST

router.post('/cadastro', postUsuario);

// GET

router.get('/User/BuscandoTDS', buscandoTDSDadosUser);

router.get('/User/BuscandoDadosUser/:id', buscandoDadosUser);


module.exports = router;