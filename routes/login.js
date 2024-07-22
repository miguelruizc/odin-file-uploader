const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('login');
});
router.post('/', (req, res) => {
	res.send(`POST /Login route hit with data: ${JSON.stringify(req.body)}`);
});

module.exports = router;
