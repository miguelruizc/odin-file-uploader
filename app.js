const express = require('express');
const path = require('node:path');

const PORT = process.env.PORT || 3000;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.status(200).render('index');
});

app.listen(PORT, () => {
	console.log(`Server running, listening port ${PORT}`);
});
