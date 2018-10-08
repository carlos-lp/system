var express = require("express");//npm install express
var app=express();
var session=require("express-session");//npm install express-session
app.use(session({"secret":"wy"}));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());


app.get("/goods",function(req,res){
    res.writeHead(200,{
        'Content-Type':'text/html;charset=utf-8',
        'Access-Control-Allow-Origin':'*'
    })
    res.end('666')

});
app.listen(9898);