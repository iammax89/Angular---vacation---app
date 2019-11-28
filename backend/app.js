const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
var multer = require("multer");
const app = express();
const GridFsStorage = require("multer-gridfs-storage");
const mongoURL =
  "mongodb+srv://max:8dVFSsSuEEMxyUtT@cluster0-3as0z.mongodb.net/Employees?retryWrites=true&w=majority";

app.use(bodyParser.json());
const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

const conn = mongoose.createConnection(mongoURL);
conn.once("open", () => {
  console.log("Connection Successful");
});
const storage = new GridFsStorage({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

app.post("/", upload.single("img"), (req, res, err) => {
  if (err) throw err;
  res.status(201).send();
});
module.exports = app;
