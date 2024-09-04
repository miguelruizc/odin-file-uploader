const path = require('node:path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { updateUserCapacity, userHasSpace } = require('../misc/userCapacity');

const POST_upload = async (req, res) => {
	// check if user is authenticated
	if (!req.isAuthenticated()) return res.redirect('/login');

	const file = req.file;
	let folderId = isNaN(parseInt(req.body.folder))
		? null
		: parseInt(req.body.folder);

	// Validation/sanitization of folderID
	if (!(folderId === null)) {
		const validFolder = await prisma.folder.findUnique({
			where: {
				id: folderId,
				userId: req.user.id,
			},
		});
		if (!validFolder) folderId = null;
	}
	// Validation of file inputed
	if (!file) {
		console.log('Error in POST request to /upload: NO FILE');
		return res.redirect('/');
	}

	// Check if user has space
	const hasSpace = await userHasSpace(file.size, req.user.id);
	if (!hasSpace) {
		console.log(
			`Attempt to upload file failed, user ID(${req.user.id}) has no space`
		);

		return res.redirect(
			`/error?errors=${encodeURIComponent('User has no space')}`
		);
	}

	// Add entry to DB
	if (req.isAuthenticated()) {
		try {
			const filepath = path.join(process.cwd(), 'uploads', req.file.filename);
			const addedFile = await prisma.file.create({
				data: {
					name: req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_'),
					uniqueName: req.file.filename,
					user: {
						connect: { id: req.user.id },
					},
					...(folderId && {
						folder: {
							connect: { id: folderId },
						},
					}),
					path: filepath,
					size: req.file.size,
				},
			});
			console.log('File uploaded and entry added to DB:\n', addedFile);
			await updateUserCapacity(req.user.id);
			return res.redirect('/');
		} catch (error) {
			console.error('Error updating DB with new File: ', error);
			return res.redirect('/');
		}
	} else {
		return res.redirect('/');
	}
};

module.exports = {
	POST_upload,
};
