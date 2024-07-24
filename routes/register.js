const express = require('express');
const router = express.Router();
const getCredentialsValidators = require('../utils/validation');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) res.status(401).render('register', { errors });
	else res.status(200).render('register');
});
router.post('/', getCredentialsValidators(), (req, res) => {
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
		res.send('Validation of the input was successful!');
		// TODO register user in the database (with hashed password)
	}
});

module.exports = router;
