const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const passportConfig = () => {
	passport.use(
		new LocalStrategy(async (username, password, done) => {
			try {
				// Search and validate username
				const user = await prisma.user.findUnique({
					where: {
						username,
					},
				});
				if (!user) return done(null, false, { message: 'Invalid credentials' });

				// Search and validate password
				const validPassword = await bcrypt.compare(password, user.password);
				if (!validPassword)
					return done(null, false, { message: 'Invalid credentials' });

				// Username & password are valid:
				return done(null, { id: user.id, username: user.username });
			} catch (error) {
				return done(error);
			}
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await prisma.user.findUnique({ where: { id } });
			if (!user) return done(new Error('User not found'), null);

			return done(null, { id: user.id, username: user.username });
		} catch (error) {
			return done(error, null);
		}
	});
};

module.exports = passportConfig;
