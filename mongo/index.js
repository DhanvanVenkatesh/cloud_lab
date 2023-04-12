const express = require("express");
const app = express();
const methodOverride = require("method-override");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(methodOverride("_method"));
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("App Is Listening 8000");
});

mongoose
  .connect(
    "mongodb+srv://venkatesh:venkatesh@cluster0.hc7ifvg.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const stud = mongoose.model("stud", userSchema);

app.get("/", (req, res) => {
  stud.find().then((data) => {
    res.render("index", {
      title: "Home Page",
      data: data,
      email: "Enter your email",
    });
  });
});

app.post("/add-item", (req, res) => {
  const user = new stud({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/display", (req, res) => {
  stud.find().then((data) => {
    res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  stud
    .findOne({
      email: email,
    })
    .then((data) => {
      data.name = name;
      data.save().then(() => {
        console.log("Updated");
      });
    });
  stud.find().then((data) => {
    res.render("index", { title: "Home Page", data: data });
  });
});

app.get("/edit/:id", (req, res) => {
  const email = req.params.id;
  stud.find().then((data) => {
    res.render("update", { email: email });
  });
});

app.get("/delete/:id", (req, res) => {
  stud
    .findOne({
      email: req.params.id,
    })
    .then(() => {
      res.render("delete", { email: req.params.id });
    });
});

app.delete("/delete/:id", (req, res) => {
  const email = req.body.email;
  stud
    .findOne({
      email: email,
    })
    .then((data) => {
      stud
        .deleteOne({
          email: data.email,
        })
        .then(() => {
          console.log("Successfully Deleted");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  res.redirect("/");
});
