const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const HASH_SALT = 10;

const prisma = new PrismaClient();

const GET_register = (req, res) => {
	if (req.isAuthenticated()) return res.redirect('/');
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) return res.status(401).render('register', { errors });
	return res.status(200).render('register');
};

const POST_register = async (req, res) => {
	let errors = validationResult(req)
		.array()
		.map((error) => error.msg);

	// Check form validation/sanitization errors
	if (errors.length > 0) {
		errors = [...new Set(errors)];
		const queryString = errors
			.map((error) => encodeURIComponent(error))
			.join(',');
		return res.redirect(`/register?errors=${queryString}`);
	} else {
		// Check if user already exists
		const username = req.body.username;
		const password = req.body.password;

		const user = await prisma.user.findFirst({
			where: { username },
		});
		if (user) {
			return res.redirect(
				`/register?errors=${encodeURIComponent('Usename already exists')}`
			);
		} else {
			// Add user to database
			try {
				const hashedPassword = await bcrypt.hash(password, HASH_SALT);
				try {
					const addedUser = await prisma.user.create({
						data: {
							username,
							password: hashedPassword,
						},
					});
					console.log('Added user successfully:\n', addedUser);
					// Log in user
					req.logIn(addedUser, (err) => {
						if (err) return next(err);
						return res.redirect('/');
					});
				} catch (err) {
					console.log(
						'Something went wrong adding new user to database: ',
						err
					);
					return res.redirect('/');
				}
			} catch (err) {
				console.log('Something went wrong hashing password: ', err);
				return res.redirect('/');
			}
		}
	}
};

module.exports = {
	GET_register,
	POST_register,
};
