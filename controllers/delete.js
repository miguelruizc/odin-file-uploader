const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const POST_delete_folder = async (req, res) => {
	// Check if user is authenticated
	if (!req.isAuthenticated()) return res.redirect('/login');

	// Check if the folder exists and belongs to user
	const folderId = parseInt(req.params.id);

	const folder = await prisma.folder.findUnique({
		where: {
			id: folderId,
		},
	});
	if (!folder || folder.userId !== req.user.id) {
		console.log(
			"Error deleting folder: Folder doesn't exist or doesn't belong to authenticated user"
		);
		return res.redirect('/');
	}

	// Delete folder and associated files from db
	const deletedFiles = await prisma.file.deleteMany({
		where: {
			folderId,
		},
	});
	// TODO: Remove physical files from the server
	const deletedFolder = await prisma.folder.delete({
		where: {
			id: folderId,
		},
	});
	console.log('Deleted folder: ', deletedFolder);
	console.log('and associated files: ', deletedFiles);

	res.redirect('/');
};

const POST_delete_file = (req, res) => {
	console.log('POST request received in /delete/folder/:id');
	res.redirect('/');
};

module.exports = {
	POST_delete_folder,
	POST_delete_file,
};
