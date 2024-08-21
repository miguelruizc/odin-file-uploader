const express = require('express');
const router = express.Router();
// const { POST_edit_folder, POST_edit_file } = require('../controllers/edit');
const { folderNameValidator } = require('../utils/validation');
const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const POST_edit_folder = async (req, res) => {
	if (!req.isAuthenticated()) return res.redirect('/login');

	// From input validation/sanitization
	let errors = validationResult(req)
		.array()
		.map((error) => error.msg);
	if (errors.length > 0) {
		errors = [...new Set(errors)];
		const queryString = errors
			.map((error) => encodeURIComponent(error))
			.join(',');
		return res.redirect(`/error?errors=${queryString}`);
	}

	// Request data
	const folderId = parseInt(req.params.id);
	const newFolderName = req.body.folderName;
	const userId = req.user.id;

	try {
		// check if folderId belongs to user
		const { folders } = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				folders: {
					where: { id: folderId },
				},
			},
		});
		if (folders.length <= 0) {
			console.log('Error: Folder does not belong to authenticated user');
			return res.redirect('/');
		}

		// update database with new folder name
		const updatedFolder = await prisma.folder.update({
			where: {
				id: folderId,
			},
			data: {
				name: newFolderName,
			},
		});
		console.log('Folder name updated: ', updatedFolder);

		return res.redirect('/');
	} catch (error) {
		console.error('Error accessing database: ', error);
		return res.redirect('/');
	}
};

const POST_edit_file = (req, res) => {
	res.redirect('/');
};

router.post('/folder/:id', folderNameValidator(), POST_edit_folder);
router.post('/file/:id', POST_edit_file);

module.exports = router;
