const express = require('express');
const router = express.Router();
const { GET_register, POST_register } = require('../controllers/register');
const getCredentialsValidators = require('../utils/validation');

router.get('/', GET_register);
router.post('/', getCredentialsValidators(), POST_register);

module.exports = router;
