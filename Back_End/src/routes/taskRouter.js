const { Router } = require('express');
const router = Router();

const { buscandoTDSDadosUser, buscandoDadosUser, postUsuario, getUser, } = require('../controller/taskController');

// POST

router.post('/cadastro', postUsuario);
router.post('/User/BuscandoDadosUser/', buscandoDadosUser);



// GET

router.get('/User/BuscandoTDS', buscandoTDSDadosUser);



module.exports = router;