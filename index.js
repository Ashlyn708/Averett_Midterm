//require express
var express = require('express');
//require body-parser
var bodyParser = require("body-parser");
//require mongoose
var mongoose = require("mongoose");
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
    //query to mongoDB for todos
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            tasks = [];
            completed = [];
            for(i = 0; i< todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i])
                }else{
                    tasks.push(todo[i])
                }
            }
        }
    });
    //return something to home page
    res.render('index', {tasks: tasks, completed: completed}); //add completed variable to ejs ex {a:a, b:b}
});


//fetch nasa information and send to front end as JSON data
app.get('/nasa', function(req, res){
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