const path = require('node:path');
const express = require('express');
const router = express.Router();

const rootDirectory = process.cwd();

router.get('/:filename', (req, res) => {
	const filePath = path.join(rootDirectory, 'uploads', req.params.filename);

	res.download(filePath, (error) => {
		if (error) {
			return res.redirect('file404');
		}
	});
});

module.exports = router;
