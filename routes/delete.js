const express = require('express');
const router = express.Router();
const {
	POST_delete_folder,
	POST_delete_file,
} = require('../controllers/delete');

router.post('/folder/:id', POST_delete_folder);
router.post('/file/:id', POST_delete_file);

module.exports = router;
