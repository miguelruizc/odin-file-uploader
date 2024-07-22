const express = require('express');
const router = express.Router();
const getCredentialsValidators = require('../utils/validation');
const { validationResult } = require('express-validator');

router.get('/', (req, res) => {
	res.status(200).render('login');
});
router.post('/', getCredentialsValidators(), (req, res) => {
	const errors = validationResult(req).errors;
	console.log(errors);
	// TODO: Add validation to register route
	res.send(`POST /Login route hit with data: ${JSON.stringify(req.body)}`);
});

module.exports = router;
