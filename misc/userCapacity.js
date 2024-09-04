const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const updateUserCapacity = async (userId) => {
	try {
		const userFiles = await prisma.file.findMany({
			where: { userId },
		});
		const totalSize = userFiles.reduce((acc, file) => acc + file.size, 0);

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: { currentUse: totalSize },
		});
		console.log('Updated user capacity: ', updatedUser);
	} catch (error) {
		console.log('Error updating user capacity: ', error);
	}
};

const userHasSpace = async (fileSize, userId) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		const expectedTotal = user.currentUse + fileSize;

		// User has no space
		if (expectedTotal > user.maxUse) return false;
		// User has space
		else return true;
	} catch (error) {
		// Error checking space
		console.log('Error checking user capacity: ', error);
		return false;
	}
};

module.exports = {
	updateUserCapacity,
	userHasSpace,
};
