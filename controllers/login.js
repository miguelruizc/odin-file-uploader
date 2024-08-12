const { validationResult } = require('express-validator');
const passport = require('passport');

const GET_login = (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) res.status(401).render('login', { errors });
	else res.status(200).render('login');
};

const POST_login = async (req, res, next) => {
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
		// No validation/sanitization errors, proceed with Passport authentication
		passport.authenticate('local', (err, user, info) => {
			if (err) return next(err);
			if (!user) {
				const errorMessages = info.message ? [info.message] : [];
				const queryString = errorMessages
					.map((msg) => encodeURIComponent(msg))
					.join(',');
				return res.redirect(`/login?errors=${queryString}`);
			}

			req.logIn(user, (err) => {
				if (err) return next(err);
				return res.redirect('/');
			});
		})(req, res, next);
	}
};

module.exports = {
	GET_login,
	POST_login,
};
