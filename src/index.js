import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { upload } from "./upload.js";

const app = express();
const server = createServer(app);
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", express.static("src/public"));

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).json({ error: "No file received." });
    return;
  }

  res.status(200).json({ success: "OK" });
});


server.listen(PORT, () => {
  console.log(`App Listening at http://localhost:${PORT}`);
});
