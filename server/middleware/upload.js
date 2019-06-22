import multer from 'multer';
import path from 'path';

var upload = multer({ dest: path.join(__dirname, 'uploads', 'images') });

export default upload;