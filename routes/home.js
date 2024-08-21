const express = require('express');
const router = express.Router();
const { GET_home } = require('../controllers/home');

router.get('/', GET_home);

module.exports = router;
