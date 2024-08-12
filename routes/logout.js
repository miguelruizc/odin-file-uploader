const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	req.logout((error) => {
		if (error) return next(error);
		res.redirect('/');
	});
});

module.exports = router;
