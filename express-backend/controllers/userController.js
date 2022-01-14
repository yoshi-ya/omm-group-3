const multer = require('multer');

const multerConfig = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, 'public/');
    },
    filename: (req,file,callback) => {
        const extension = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${extension}`);
    }
});

const isImage = (req, file, callback) =>{
    if(file.mimetype.startsWith('image')){
        callback(null, true);
    }else{
        callback(new Error('Please upload an image..'))
    }
}

const upload = multer({
   // dest: 'public/'
    storage: multerConfig,
    fileFilter: isImage,
});

exports.uploadImage = upload.single('photo');


exports.upload = (req, res) => {

    console.log(req.file); 
    res.status(200).json({
        success: 'Success',
    })
}