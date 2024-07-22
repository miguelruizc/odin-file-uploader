const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportConfig = () => {
	passport.use(
		new LocalStrategy((username, password, done) => {
			const user = username; // TODO: Search user in db
			const pass = password; // TODO: Compare pass with hash with bcryptjs

			if (false) {
				// If invalid credentials (TODO: Implement validation)
				return done(null, false, { message: 'Invalid credentials' });
			} else {
				// If valid credentials
				return done(null, user);
			}
		})
	);

	passport.serializeUser((user, done) => {
		// TODO: Implement this for Prisma/postgresql id
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		const user = id; // TODO: find user by id
		done(null, user);
	});
};

module.exports = passportConfig; // TODO: Invoke in main code
