const GET_error = (req, res) => {
	const errors = req.query.errors ? req.query.errors.split(',') : undefined;
	if (!errors) return res.redirect('/');

	res.render('error', { errors });
};

module.exports = {
	GET_error,
};
