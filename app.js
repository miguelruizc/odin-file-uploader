const express = require('express');
const path = require('node:path');
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
app.get('/', (req, res) => {
	res.status(200).render('index');
});
app.get('/login', (req, res) => {
	res.status(200).render('login');
});
app.post('/login', (req, res) => {
	res.send(`POST /Login route hit with data: ${JSON.stringify(req.body)}`);
});
app.get('/register', (req, res) => {
	res.status(200).render('register');
});
app.post('/register', (req, res) => {
	res.send(`POST /Register route hit with data: ${JSON.stringify(req.body)}`);
});
app.get('/*', (req, res) => {
	res.status(404).render('404');
});

// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}`);
});
