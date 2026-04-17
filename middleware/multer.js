const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }, // 5MB
    filefilter:fileFilter
});



module.exports = upload;
