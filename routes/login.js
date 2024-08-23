const express = require('express');
const router = express.Router();
const { credentialsValidators } = require('../misc/validation');
const { GET_login, POST_login } = require('../controllers/login');

router.get('/', GET_login);
router.post('/', credentialsValidators(), POST_login);

module.exports = router;
