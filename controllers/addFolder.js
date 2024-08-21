const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const POST_addFolder = async (req, res) => {
	if (req.isAuthenticated()) {
		let errors = validationResult(req)
			.array()
			.map((error) => error.msg);

		if (errors.length > 0) {
			console.log('Errors in /addFolder POST request: ');
			console.log(errors);
			return res.redirect('/'); // If form sanitization is invalid, redirect to /
		}

		// If form sanitization is valid:
		console.log('POST request to /addFolder with data: ');
		console.log('FolderName: ', req.body.folderName);
		console.log('User: ', req.user);
		try {
			const folder = await prisma.folder.create({
				data: {
					name: req.body.folderName,
					user: {
						connect: { id: req.user.id },
					},
				},
			});
			console.log('Folder created: ', folder);

			return res.redirect('/');
		} catch (error) {
			console.error('Error creating Folder item in database: ', error);
			return res.redirect('/');
		}
	} else return res.redirect('/');
};

module.exports = {
	POST_addFolder,
};
