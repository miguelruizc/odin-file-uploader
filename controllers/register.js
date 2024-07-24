const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const GET_register = (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) return res.status(401).render('register', { errors });
	return res.status(200).render('register');
};

const POST_register = (req, res) => {
	let errors = validationResult(req)
		.array()
		.map((error) => error.msg);

	if (errors.length > 0) {
		errors = [...new Set(errors)];
		const queryString = errors
			.map((error) => encodeURIComponent(error))
			.join(',');
		res.redirect(`/register?errors=${queryString}`);
	} else {
		// TODO: Add user to the database
		// TODO: Login user
		res.redirect('/');
	}
};

module.exports = {
	GET_register,
	POST_register,
};
