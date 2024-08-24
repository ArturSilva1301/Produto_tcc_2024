const { Router } = require('express');
const { postImagem } = require('../controller/muralController');

const router = Router();

router.post('/update/postimg', postImagem); // A rota está correta

module.exports = router;
