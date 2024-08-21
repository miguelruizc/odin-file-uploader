const express = require('express');
const router = express.Router();
const { GET_download } = require('../controllers/download');

router.get('/:filename', GET_download);

module.exports = router;
