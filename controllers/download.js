const path = require('node:path');
const rootDirectory = process.cwd();

const GET_download = (req, res) => {
	const filePath = path.join(rootDirectory, 'uploads', req.params.filename);

	res.download(filePath, (error) => {
		if (error) {
			return res.redirect('file404');
		}
	});
};

module.exports = {
	GET_download,
};
