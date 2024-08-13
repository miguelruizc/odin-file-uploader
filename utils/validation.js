const { body } = require('express-validator');

const credentialsValidators = () => {
	const rules = [
		body('username')
			.notEmpty()
			.withMessage('Username field must be filled')
			.bail()
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage('Special characters and spaces are not allowed.'),
		body('password')
			.notEmpty()
			.withMessage('Password field must be filled')
			.bail()
			.matches(/^[a-zA-Z0-9]+$/)
			.withMessage('Special characters and spaces are not allowed.'),
	];

	return rules;
};

const folderNameValidator = () => {
	const rules = [
		body('folderName')
			.trim()
			.notEmpty()
			.withMessage('Folder name field must be filled')
			.bail()
			.matches(/^[a-zA-Z0-9 ]+$/)
			.withMessage('Special characters are not allowed.'),
	];

	return rules;
};

module.exports = { credentialsValidators, folderNameValidator };
