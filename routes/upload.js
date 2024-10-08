const express = require('express');
const router = express.Router();
const upload = require('../misc/multerSetup');
const { POST_upload } = require('../controllers/upload');

router.post('/', upload.single('file'), POST_upload);

module.exports = router;
