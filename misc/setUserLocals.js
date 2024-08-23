const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { formatDate } = require('./formatDate');

const setUserLocals = async (req, res, next) => {
	res.locals.user = req.user;
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.folders = null;
	res.locals.files = null;
	res.locals.formatDate = formatDate;

	if (req.isAuthenticated()) {
		const user = await prisma.user.findUnique({
			where: {
				id: req.user.id,
			},
			include: {
				folders: { orderBy: { id: 'asc' } },
				files: { orderBy: { id: 'asc' } },
			},
		});

		res.locals.folders = user.folders;
		res.locals.files = user.files;
	}

	next();
};

module.exports = setUserLocals;
