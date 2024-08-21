const express = require('express');
const router = express.Router();
const { folderNameValidator } = require('../utils/validation');
const { POST_addFolder } = require('../controllers/addFolder');

router.post('/', folderNameValidator(), POST_addFolder);

module.exports = router;
