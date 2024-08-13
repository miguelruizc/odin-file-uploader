const express = require('express');
const router = express.Router();
const { folderNameValidator } = require('../utils/validation');
const { validationResult } = require('express-validator');

router.post('/', folderNameValidator(), (req, res) => {
	let errors = validationResult(req)
		.array()
		.map((error) => error.msg);

	if (errors.length > 0) {
		console.log(errors);
		return res.redirect('/invalidFolderName');
		// TODO: decide if reload form and show errors or just redirect to '/'
	}

	console.log('POST request to /addFolder with data: ');
	console.log('FolderName: ', req.body.folderName);
	res.redirect('/');
});

module.exports = router;
