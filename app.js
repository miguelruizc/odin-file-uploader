const path = require('node:path');
const express = require('express');
const homeRouter = require('./routes/home');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const passportConfig = require('./utils/passportConfig');

// Setup
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
passportConfig();

// Middlewares
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.get('/*', (req, res) => {
	res.status(404).render('404');
});

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}`);
});
