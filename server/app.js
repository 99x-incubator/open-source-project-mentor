// import libraries
const path = require("path");
const express = require("express");
//to handle POST requests
const bodyParser = require("body-parser");
// Mongoose is for MongoDB in node
const mongoose = require("mongoose");
// Used handlebars templating for ease
const expressHandlebars = require("express-handlebars");

// import our router.js file to handle
const router = require("./router.js");

const app = express();
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// parse form POST requests as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "",
  })
);
app.set("view engine", "handlebars");
// set the views path
app.set("views", `${__dirname}/../views`); //views have to be setup using handlebars
mongoose
  .connect("mongodb://localhost:27017/mentor_issue", { useNewUrlParser: true }) //testdb is temp
  .catch((error) => handleError(error));

// pass our app to our router object to map the routes
router(app);
// Tell the app to listen on the specified port
app.listen(port, (err) => {
  // if the app fails, throw the err
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
  //console.log(__dirname);
});
