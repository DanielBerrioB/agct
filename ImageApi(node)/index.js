var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

app.use("/", require("./routes/_index"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

var port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening ${port}`);
});
