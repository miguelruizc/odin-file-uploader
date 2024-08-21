const GET_home = (req, res) => {
	res.status(200).render('home');
};

module.exports = {
	GET_home,
};
