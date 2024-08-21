const path = require('node:path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const POST_upload = async (req, res) => {
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

	// Add entry to DB
	if (req.isAuthenticated()) {
		try {
			const filepath = path.join(process.cwd(), 'uploads', req.file.filename);
			const addedFile = await prisma.file.create({
				data: {
					name: req.file.filename,
					user: {
						connect: { id: req.user.id },
					},
					...(folderId && {
						folder: {
							connect: { id: folderId },
						},
					}),
					path: filepath,
				},
			});
			console.log('File uploaded and entry added to DB:\n', addedFile);
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
