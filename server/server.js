const express = require('express');

//body-parser is a middleware that extracts the entire body portion of an inocming request stream and 
//exposes it on req.body
const bodyParser = require('body-parser'); 
const cors=require('cors');

const PORT=3000;
const api=require('./routes/api')

const app=express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api',api)



app.get('/',function(req,res){
    res.send('Hello from server');
});

// app.post('/enroll',function(req,res){
//     console.log(req.body);
//     res.status(200).send({"message":"Data Received"});
// })

app.listen(PORT, function(){
    console.log("Server running on localhost: "+PORT);
});

// app.all('*', function(res,req,next){
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Credentials',true);
//     res.header('Access-Control-Allow-Methods','PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers','Content-Type');
//     next();
// });