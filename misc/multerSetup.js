const multer = require('multer');
const path = require('node:path');

const allowedMimeTypes = [
	// Images
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/bmp',
	'image/svg+xml',
	// Documents
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'application/vnd.ms-powerpoint',
	'application/vnd.openxmlformats-officedocument.presentationml.presentation',
	'text/plain',
	'application/rtf',
	// Compressed
	'application/zip',
	'application/vnd.rar',
	'application/x-7z-compressed',
	// Audio/Video
	'audio/mpeg',
	'audio/wav',
	'video/mp4',
	'video/quicktime',
	'video/x-msvideo',
	// Text Files
	'text/csv',
	'application/json',
	'application/xml',
	'text/xml',
];

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		const timestamp = Date.now();
		const filename = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_'); // Sanitize
		const ext = path.extname(filename);
		const completeName = `${path.basename(filename, ext)}-${timestamp}${ext}`;

		cb(null, completeName);
	},
});

const fileFilter = (req, file, cb) => {
	if (allowedMimeTypes.includes(file.mimetype)) {
		// Accept file
		cb(null, true);
	} else {
		// Reject file
		cb(
			new Error(
				'Invalid file type. Allowed file types: .jpg, .jpeg, .png, .gif, .bmp, .svg, .pdf, .doc, .docx, .ppt, .pptx, .txt, .rtf, .zip, .rar, .7z, .mp3, .wav, .mp4, .mov, .avi, .csv, .json, .xml'
			),
			false
		);
	}
};

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
	fileFilter: fileFilter,
});

module.exports = upload;
