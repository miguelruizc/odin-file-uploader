const express = require('express');
const router = express.Router();
const usernamePasswordValidators = require('../utils/formValidation');

router.get('/', (req, res) => {
	res.status(200).render('login');
});
router.post('/', usernamePasswordValidators, (req, res) => {
	// TODO: Test usernamePasswordValidator
	// TODO: Implement logic with validation results
	// TODO: Add validation to register route
	res.send(`POST /Login route hit with data: ${JSON.stringify(req.body)}`);
});

module.exports = router;
