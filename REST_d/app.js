const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const postsRoute = require("./routes/posts");
app.use("/posts", postsRoute);
//ROUTES
app.get("/", (req, res) => {
  res.send("We are on Home");
});

//db connect
mongoose.connect(
  "mongodb://localhost:27017/",
  {
    dbName: "rest",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => (err ? console.log(err) : console.log("Connected to database"))
);

app.listen(3000);
