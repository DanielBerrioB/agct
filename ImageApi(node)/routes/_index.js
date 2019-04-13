var express = require("express");
var MongoClient = require("mongodb").MongoClient;
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

var urlMongo =
  "mongodb+srv://DanielBB:DanielBB@cluster0-qdjmv.mongodb.net/test?retryWrites=true";

const upload = multer({ storage: storage });

const client = new MongoClient(urlMongo, { useNewUrlParser: true });

app.use(bodyParser.json());

app.get("/main/", (req, res) => {
  client.connect(err => {
    if (err) throw err;
    const collection = client.db("image").collection("files");
    collection.find().toArray((err, result) => {
      if (err) throw err;
      res.status(200).send(result);
      client.close();
    });
  });
});

app.post("/main/", upload.single("productImage"), (req, res) => {
  client.connect(err => {
    if (err) throw err;
    var db = client.db("image");
    db.collection("files").insert({
      name: req.file.name,
      path: req.file.path
    });
    db.collection("files")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.status(201).send(result);
        client.close();
      });
  });
});

module.exports = app;
