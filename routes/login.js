const express = require('express');
const router = express.Router();
const getCredentialsValidators = require('../utils/validation');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;

	if (errors) res.status(401).render('login', { errors });
	else res.status(200).render('login');
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
		res.redirect(`/login?errors=${queryString}`);
	} else {
		res.send('Validation of the input was successful!');
		// TODO Login user
	}
});

module.exports = router;
