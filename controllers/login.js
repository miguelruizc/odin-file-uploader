const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const GET_login = (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) res.status(401).render('login', { errors });
	else res.status(200).render('login');
};

const POST_login = async (req, res) => {
	let errors = validationResult(req)
		.array()
		.map((error) => error.msg);

	// Check validation/sanitization errors
	if (errors.length > 0) {
		errors = [...new Set(errors)];
		const queryString = errors
			.map((error) => encodeURIComponent(error))
			.join(',');
		return res.redirect(`/login?errors=${queryString}`);
	} else {
		try {
			// Check if user exists
			const user = await prisma.user.findUnique({
				where: {
					username: req.body.username,
				},
			});
			if (!user)
				return res.redirect(
					`/login?errors=${encodeURIComponent('Invalid credentials')}`
				);
			else {
				try {
					// Check if password matches
					const validPassword = await bcrypt.compare(
						req.body.password,
						user.password
					);
					if (!validPassword)
						return res.redirect(
							`/login?errors=${encodeURIComponent('Invalid credentials')}`
						);
					// TODO: Login user
					console.log('User succesfully authenticated: ', user.username);
					return res.redirect('/');
				} catch (err) {
					console.log('Something went wrong comparing passwords: ', err);
					return res.redirect('/');
				}
			}
		} catch (err) {
			console.log('Something went wrong finding user: ', err);
			return res.redirect('/');
		}
	}
};

module.exports = {
	GET_login,
	POST_login,
};
