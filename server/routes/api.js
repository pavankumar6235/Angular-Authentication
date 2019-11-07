//Importing express and router
const express= require('express');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
//const db = "mongodb+srv://mycluster-i0a8n.mongodb.net/eventdb"
const db = "mongodb://localhost:27017/eventdb"

mongoose.connect(db, err=>{
    if(err){
        console.error('Error!',err)
    }
    else{
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === null){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

//Handling the get request 
router.get('/',(req,res)=>{
    res.send('From API route')
})

//A post request to store the data into the database
router.post('/register',(req,res)=>{
    let userData = req.body         //Extracting user information from request body
    let user =new User(userData)    //create a user model which mongoose understands
    user.save((error, registeredUser)=>{
        if(error){
            console.log(error)
        }
        else{
            let payload = { subject: registeredUser._id }   //generating a payload to generate the token
            let token = jwt.sign(payload, 'secretKey')      //generating a token with jwt.sign() method
            res.status(200).send({token})                   //passing the token object as a response instead of user data
        }
    })
})

//To check the credentials of user with database
router.post('/login',(req,res)=>{
    let userData = req.body
    
    //To check if the email is available in database
    User.findOne({email: userData.email},(error, user)=>{
        if(error){
            console.log(error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid Email')
            }
            else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid Password')
                }
                else{
                    let payload = { subject: user._id }          //generating a payload to generate the token
                    let token = jwt.sign(payload, 'secretKey')  //generating a token with jwt.sign() method
                    res.status(200).send({token})              //passing the token object as a response instead of user data
                }
            }
        }
    })
})

//Hard-coded methods for the regular and special events
router.get('/events',(req,res)=>{
    let events = [
        {
            "_id" : "1",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "2",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "3",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "4",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

router.get('/special',verifyToken,(req,res)=>{
    let events = [
        {
            "_id" : "1",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "2",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "3",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        },
        {
            "_id" : "4",
            "name" : "Auto Expo",
            "description" : "lorem ipsum",
            "date" : "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})

//Exporting the router
module.exports=router
