import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const uploadMiddleware = upload.single('input');

export default uploadMiddleware;