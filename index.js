const express = require('express');
const index = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = 3000;
var searchedShow;


//index.use(bodyParser.urlencoded({extended: true})); -> allows express to get data from the req.body of a url and the extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.

index.use(bodyParser.urlencoded({extended: true}));

index.set('view engine', 'ejs');

index.get('/', (req, res) => res.send('This is the TV Show App.'));


index.get("/searchshow", function(req, res){
  var searchUrl = 'http://api.tvmaze.com/singlesearch/shows?q=' + searchedShow;
   request(searchUrl , function(error, response, body){
     if(!error && response.statusCode == 200){
       let results = JSON.parse(body);
        res.send(`${results["url"]} - ${results['name']}`);
      }
   });
});

index.get("/tvsearch", function(req, res){
  res.render("tvsearch");
});

index.post('/showsearch', function(req, res){
  searchedShow = req.body.newshow;
  console.log(req.body);
  res.redirect("/searchshow");

});

index.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

// written by @andrewlopezcodes on Github