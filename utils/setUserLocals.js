const setUserLocals = (req, res, next) => {
	res.locals.user = req.user;
	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.files = null;
	next();
};

module.exports = setUserLocals;
