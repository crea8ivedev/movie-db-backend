import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existsSync(path.resolve("public/uploads"))){
        fs.mkdirSync(path.resolve("public/uploads"), { recursive: true });
    }
    cb(null, path.resolve("public/uploads"));
  },
  filename: (req, file, cb) => {
    const id = uuidv4();
    const extName = file.originalname.split(".").at(-1);
    cb(null, `${id}.${extName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG are allowed."),
      false
    );
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
