const express = require('express');
const index = express();
const request = require('request');
const port = 3000;


index.set('view engine', 'ejs');

index.get('/', (req, res) => res.send('This is the TV Show App.'));


index.get("/searchshow", function(req, res){
   request("http://api.tvmaze.com/singlesearch/shows?q=friends", function(error, response, body){
     if(!error && response.statusCode == 200){
       let results = JSON.parse(body);
        res.send(`${results["url"]} - ${results['name']}`);
      }
   });
});

index.get("/tvsearch", function(req, res){
  res.render("tvsearch");
});

index.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))