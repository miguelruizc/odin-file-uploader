const multer = require('multer');
const path = require('node:path');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const timestamp = Date.now();
		const filename = file.originalname.split(' ').join('-');
		const ext = path.extname(filename);
		const completeName = `${path.basename(filename, ext)}-${timestamp}${ext}`;

		cb(null, completeName);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
