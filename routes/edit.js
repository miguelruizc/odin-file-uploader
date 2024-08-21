const express = require('express');
const router = express.Router();
const { POST_edit_folder, POST_edit_file } = require('../controllers/edit');
const { folderNameValidator } = require('../utils/validation');

router.post('/folder/:id', folderNameValidator(), POST_edit_folder);
router.post('/file/:id', POST_edit_file);

module.exports = router;
