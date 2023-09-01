const express = require('express');
const router = express.Router()
const User = require('../models/User');
const { body ,validationResult } = require('express-validator');  
const bcrypt = require('bcryptjs'); 
const fetchusers = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Bunny$Secret';

// ROUTE 1 : creating user  using : POST and Path is "/api/auth/createuser"  .  Dose't need to Auth
router.post('/createuser',[
    body('name' , 'Enter a valid name').isLength({min:3}),
    body('password' ,' Password must be atleast 5 charactors').isLength({min:5}),
    body('email', 'Enter a valid Email').isEmail(),

] ,async(req , res) => {
    let success = false;
    
    // If there is errors then return bad request error , and erros
    const errors = validationResult(req);


    if (!errors.isEmpty()){
        success = false;
        return res.status(400).json({success ,errors: errors.array()});
    }
    // checking if the email is already use or exist in db
    try {
        
    
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(200).json({success, error : "Sorry a user with this email already exists."});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt)
    user = await User.create({
        name : req.body.name,
        email : req.body.email,
        password : secPass
    })
    const data = {
        user:{
            id:user.id
        }
    }
    success = true;
    const authtoken = jwt.sign(data,JWT_SECRET);
    res.json({ success,authtoken})
} catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error: " + error.message);
}   
});


// ROUTE 2 : login  using : POST and Path is "/api/auth/login"  .  Dose't need to Auth

router.post('/login',[

    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

],async(req , res) => {
    let success = false;
    // If there is errors then return bad request error , and erros
    const errors = validationResult(req);


    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    const {email , password} = req.body;
    try {
        let user = await User.findOne({email});

        if(!user){
            success = false
            return res.status(400).json({success, errors:"Please try to login with correct credentials"})
        }

        const passwordCompair = await bcrypt.compare(password,user.password) ;
        if(!passwordCompair){
            success = false;
            return res.status(400).json({success , errors:"Please try to login with correct credentials"})

        }
        
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    
        success = true  ;
        res.json({success, authtoken})

        // res.send(authtoken);

    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Errors ");
    }   
    
});






// ROUTE 3 : Getting login  User deatils : POST and Path is "/api/auth/login"  . Need to login/auth

router.post('/getuser', fetchusers ,async(req  , res) => {


    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);



    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Errors ");
    } 
});

module.exports = router