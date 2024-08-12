const express = require('express');
const router = express.Router();
const upload = require('../utils/multerSetup');

router.post('/', upload.single('file'), (req, res) => {
	console.log('File recieved via POST request in /upload:');
	console.log(req.file);
	res.redirect('/');
});

module.exports = router;
