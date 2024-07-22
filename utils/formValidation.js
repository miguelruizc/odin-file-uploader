const { body } = require('express-validator');

const usernamePasswordValidators = () => {
	const rules = [
		body('username')
			.trim()
			.notEmpty()
			.withMessage('Username field must be filled')
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage(
				'Username: Special characters and spaces are not allowed.'
			),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('Password field must be filled')
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage(
				'Password: Special characters and spaces are not allowed.'
			),
	];

	return rules;
};

module.exports = usernamePasswordValidators;
