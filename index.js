//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require node-fetch
var fetch = require('node-fetch');
//create express object, call express
var app = express();
//get port information
const port = process.env.PORT || 3000;

//tell application to use EJS for templates
app.set('view engine', 'ejs');
//make styles public
app.use(express.static("public"));
//tell app to use Body parser
app.use(bodyParser.urlencoded({extended: true}));


//Couple of items todo
var tasks = [];
//completed items
var completed = [];

//get home page /
app.get('/', function(req, res){
    let comicData;
    fetch('http://xkcd.com/info.0.json')
    console.log("got it");
    res.render('index');
});

app.get('/nasa', function(req, res){
    let nasaData;
    fetch('https://api.nasa.gov/planetary/apod?api_key=7lqr4qoVCaJweZv9hp89XHb6he3UEqesrowGwAMa')
    .then(res => res.json())
    .then(data => {
        res.render('nasa',{data:data})
    });
})
//fetch nasa information and send to front end as JSON data\
//change nasa to comic
app.get('/nasaDate', function(req, res){
    let nasaData;
    fetch('https://api.nasa.gov/planetary/apod?api_key=7lqr4qoVCaJweZv9hp89XHb6he3UEqesrowGwAMa')
    .then(res => res.json())
    .then(data => {
        nasaData = data;
        res.json(nasaData);
    });
})

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});
