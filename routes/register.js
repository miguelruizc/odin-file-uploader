const express = require('express');
const router = express.Router();
const { GET_register, POST_register } = require('../controllers/register');
const { credentialsValidators } = require('../misc/validation');

router.get('/', GET_register);
router.post('/', credentialsValidators(), POST_register);

module.exports = router;
