const GET_logout = (req, res) => {
	req.logout((error) => {
		if (error) return next(error);
		res.redirect('/');
	});
};

module.exports = {
	GET_logout,
};
