const express = require('express');
const path = require('node:path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.status(200).render('index');
});
app.get('/login', (req, res) => {
	res.status(200).render('login');
});
app.get('/register', (req, res) => {
	res.status(200).render('register');
});
app.get('/*', (req, res) => {
	res.status(404).render('404');
});

app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}`);
});
