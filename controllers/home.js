const GET_home = (req, res) => {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}
	res.status(200).render('home');
};

module.exports = {
	GET_home,
};
