const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('register');
});
router.post('/', (req, res) => {
	res.send(`POST /Register route hit with data: ${JSON.stringify(req.body)}`);
});

module.exports = router;
