const express = require('express');
const router = express.Router();
const { GET_error } = require('../controllers/error');

router.get('/', GET_error);

module.exports = router;
