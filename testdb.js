const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
	try {
		const addedUser = await prisma.user.create({
			data: {
				username: 'Paparrucho Perigüello',
				password: 'Super secret password',
			},
		});
		console.log(addedUser);
	} catch (error) {
		console.log('Something went wrong: ', error);
	}
}
run();
