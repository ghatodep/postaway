import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, "static/uploads/");
  },
  filename: (request, file, cb) => {
    let name = `PostImage_${new Date().valueOf()}_${file.originalname}`;
    console.log(name);
    cb(null, name);
  },
});

const uploadFileMiddleware = multer({ storage: storageConfig });

export default uploadFileMiddleware;
