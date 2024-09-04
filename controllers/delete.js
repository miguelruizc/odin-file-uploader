const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('node:fs');
const { updateUserCapacity } = require('../misc/userCapacity');

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
	const filesToDelete = await prisma.file.findMany({
		where: {
			folderId,
		},
	});
	const deletedFiles = await prisma.file.deleteMany({
		where: {
			folderId,
		},
	});
	const deletedFolder = await prisma.folder.delete({
		where: {
			id: folderId,
		},
	});
	console.log('Deleted folder: ', deletedFolder);
	console.log('and associated files: ', deletedFiles);
	await updateUserCapacity(req.user.id);

	// Remove physical files from the server
	filesToDelete.forEach((file) => {
		fs.unlink(file.path, (error) => {
			if (error) {
				console.error('Error deleting file from the filesystem: ', error);
			} else {
				console.log('File removed from the filesystem successfully');
			}
		});
	});

	res.redirect('/');
};

const POST_delete_file = async (req, res) => {
	// Check if user is authenticated
	if (!req.isAuthenticated()) return res.redirect('/login');

	// Check if the file exists and belongs to user
	const fileId = parseInt(req.params.id);

	const file = await prisma.file.findUnique({
		where: {
			id: fileId,
		},
	});

	console.log('fileId: ', fileId);
	console.log('File: ', file);

	if (!file || file.userId !== req.user.id) {
		console.log(
			"Error deleting file: File doesn't exist or doesn't belong to authenticated user"
		);
		return res.redirect('/');
	}

	// Delete file from db
	const deletedFile = await prisma.file.delete({
		where: {
			id: fileId,
		},
	});
	console.log('Deleted file: ', deletedFile);
	await updateUserCapacity(req.user.id);

	// Remove physical file from the server
	fs.unlink(deletedFile.path, (error) => {
		if (error) {
			console.error('Error deleting file from the filesystem: ', error);
		} else {
			console.log('File removed from the filesystem successfully');
		}
	});

	res.redirect('/');
};

module.exports = {
	POST_delete_folder,
	POST_delete_file,
};
