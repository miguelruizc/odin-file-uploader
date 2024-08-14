const express = require('express');
const router = express.Router();
const upload = require('../utils/multerSetup');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/', upload.single('file'), async (req, res) => {
	const file = req.file;
	let folderID = isNaN(parseInt(req.body.folder))
		? null
		: parseInt(req.body.folder);

	if (!(folderID === null)) {
		const validFolder = await prisma.folder.findUnique({
			where: {
				id: folderID,
				userId: req.user.id,
			},
		});
		if (!validFolder) folderID = null;
	}

	if (!file) {
		console.log('Error in POST request to /upload: NO FILE');
		return res.redirect('/');
	}

	console.log('File recieved via POST request in /upload:');
	console.log('File: ', req.file);
	console.log('Selected folder: ', folderID);
	res.redirect('/');
});

module.exports = router;
