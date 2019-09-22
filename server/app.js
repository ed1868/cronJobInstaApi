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

randomItem = items => {
  return items[Math.floor(Math.random() * 2)];
};

// schedule tasks to be run on the server
cron.schedule("* * * * *", function() {
  console.log("entro en el schedule");
  let travelQuery = "spain";

  axios
    .get("https://api.unsplash.com/photos/random", {
      baseURL: "https://api.unsplash.com",
      headers: {
        Authorization:
          "Client-ID 99c39db334d3eb60a9159c928d1aee0bdd30879521c2669a6424a8a4de8f7096"
      },
      params: { query: travelQuery,
                per_page: 5,
               }
    })
    .then(response => {
  
      let payload = response.data;
      let pictureDescription = response.data.description;
      let altDescription = response.data.description;
      let url = response.urls.full;
      let downloadLink = response.links.download;
      let user = response.user.name;
      let userName = response.user.username;
      let userPicture = response.user.profile_image.large;
      let instagramUsername = response.user.instagram_username;
      let photoMake = response.exif.make;
      let photoModel = response.exif.model;
      let title = response.location.title;
      let city = response.location.city;
      let country = response.location.country;
      let coordinates = [' `${response.location.position.latitude}`, `${response.location.position.longitude}`'];

      console.log(payload);


      //       let topPicks = [];

//       for (let i = 0; i < 2; i++) {
//         topPicks.push(apiResults);
//       }

//       // console.log(topPicks.length);
// console.log(topPicks);
// console.log(topPicks.length);
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
