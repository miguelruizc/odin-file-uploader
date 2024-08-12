const setUserLocals = (req, res, next) => {
	res.locals.user = req.user;
	res.locals.isAuthenticated = req.isAuthenticated();
	next();
};

module.exports = setUserLocals;
