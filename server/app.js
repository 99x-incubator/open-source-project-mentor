// import libraries
// path is a built-in node library to handle file system paths
const path = require("path");
// express is a popular Model-View-Controller framework for Node
const express = require("express");
// library to handle POST requests any information sent in an HTTP body
const bodyParser = require("body-parser");
// Mongoose is one of the most popular MongoDB libraries for node
const mongoose = require("mongoose");
// express handlebars is an express plugin for handlebars templating
const expressHandlebars = require("express-handlebars");

// import our router.js file to handle 
you have 'routes' that line up URLs to controller methods
const router = require("./router.js");

//TO COMPLETE AFTER MONGO setup
