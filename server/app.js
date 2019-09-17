const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const cron = require("node-cron");
const fs = require("fs");


const axios = require('axios');
const request = require('request');

mongoose.connect('mongodb://localhost/server');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




    // schedule tasks to be run on the server   
    cron.schedule("* * * * *",  function() {
      console.log('entro en el schedule');
      let e = "supreme";

      
      axios.get("https://api.unsplash.com/search/photos",{    
        
      baseURL: 'https://api.unsplash.com' , 
      headers: {
        Authorization:
          "Client-ID 99c39db334d3eb60a9159c928d1aee0bdd30879521c2669a6424a8a4de8f7096"
      },
      params: { query: e },
        
      }).then((response) => {
        console.log(response.data);
      });


(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  console.log(JSON.stringify(auth));

  // getting random square image from internet
  const imageRequest = await get({
    url: 'https://picsum.photos/800/800', // random picture with 800x800 size
    encoding: null, // this is required, we could convert body to buffer only with null encoding
  });

  // converting image body to buffer
  const imageBuffer = Buffer.from(imageRequest.body, 'binary');

  const publishResult = await ig.publish.photo({
    file: imageBuffer, // image buffer, you also can specify image from your disk using fs
    caption: 'Really nice photo from the internet! 💖', // nice caption (optional)
  });

  console.log(publishResult); // publishResult.status should be "ok"
})();

    });

    


const index = require('./routes/index');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
