const router = require('express').Router();

const { storeResponsaveis } = require('../controller/responsaveisController')

router.post('/store/school', storeResponsaveis);

module.exports = router;