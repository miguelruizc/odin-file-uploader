const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	console.log('Logout route visited, redirecting to /');
	// TODO: Implement logout (after implementing logIn)
	res.redirect('/');
});

module.exports = router;
