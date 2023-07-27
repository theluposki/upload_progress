import multer from "multer";
import { randomUUID } from "node:crypto";

const storage = multer.diskStorage({
  destination: "src/uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${randomUUID()}`;
    const fileName = `${uniqueSuffix}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({ storage });