const multer = require('multer');

const errorHandler = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		return res.status(400).render('error', { errors: [err.message] });
	} else if (err) {
		return res.status(500).render('error', { errors: [err.message] });
	} else {
		next();
	}
};

module.exports = {
	errorHandler,
};
