  
require('dotenv').config();

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");
const fs = require("fs");

const axios = require("axios");
const request = require("request");

mongoose.connect("mongodb://localhost/server");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

instagramPublish = (pictureDescription, urlFull, altDescription,title,city,country) => {
  console.log('entro');
};

// schedule tasks to be run on the server
cron.schedule("* * * * *", function() {
  console.log("Cron Job Initiated");
  let travelQuery = "spain";

  axios
    .get("https://api.unsplash.com/photos/random", {
      baseURL: "https://api.unsplash.com",
      headers: {
        Authorization:
          `${process.env.CLIENT_ID}`
      },
      params: { query: travelQuery,
                per_page: 5,
               }
    })
    .then(response => {
  
      let payload = response.data;

      console.log(Object.keys(payload));

      //PICTURE INFO
      let pictureDescription = response.data.description;
      let  altDescription= response.data.alt_description;
      let urls = response.data.urls;
      let urlFull = response.data.urls.full;
      let downloadLink = response.data.links.download;

      //USER FROM PICTURE DATA
      let user = response.data.user.name;
      let userName = response.data.user.username;
      let userPicture = response.data.user.profile_image.large;
      let instagramUsername = response.data.user.instagram_username;

      //PICTURE LOCATION DATA 
      let photoMake = response.data.exif.make;
      let photoModel = response.data.exif.model;
      let title = response.data.location.title;
      let city = response.data.location.city;
      let country = response.data.location.country;
      let coordinates = [`${response.data.location.position.latitude}`, `${response.data.location.position.longitude}`];

      instagramPublish(pictureDescription, urlFull, altDescription,title,city,country);


    });
});

const index = require("./routes/index");
app.use("/", index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
