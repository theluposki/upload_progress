import multer from "multer";
import { randomUUID } from "node:crypto";
import path from "node:path";

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomUUID()}`;
    const fileName = `___${uniqueSuffix}___${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({ storage, fileFilter });
