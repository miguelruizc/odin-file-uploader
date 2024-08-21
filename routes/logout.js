const express = require('express');
const router = express.Router();
const { GET_logout } = require('../controllers/logout');

router.get('/', GET_logout);

module.exports = router;
