const router = require('express').Router();

const { storeSchool } = require('../controller/escolaController')

router.post('/store/school', storeSchool);

module.exports = router;