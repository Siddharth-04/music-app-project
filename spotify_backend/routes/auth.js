const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {getToken} = require("../utils/helper");

//Post route will help to register a user
router.post("/register",async (req,res)=>{
    const{email,password,firstname,lastname,username}= req.body;

    //does user exist,if yes throw error
    const user = await User.findOne({email:email});

    if(user){
        return res
        .status(403)
        .json({error:"A user already exist with this email"});
    }
    
    //This is a valid request
    //create a new user in db
    const hashedPassword = await bcrypt.hash(password,10); //added await
    const newUserData = {
        email,
        password : hashedPassword,
        firstname,
        lastname,
        username
    };
    const newUser = await User.create(newUserData);

    //creting a token to return to user
    const token = await getToken(email,newUser);

    const userToReturn = {...newUser.toJSON(),token};
    delete userToReturn.password;

    return res.status(200).json(userToReturn);
});

router.post("/login",async (req,res)=>{
    //step 1 get email and pass
    const {email,password} = req.body;

    //step 2 check if user exists
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(403).json({err:"Invalid credentials"});
    }

    //step 3 check if password is correct
    const isPasswordValid = await bcrypt.compare(password,user.password);
   
    if(!isPasswordValid)
    {
        return res.status(403).json({error:"Invlaid credentials"});
    }

    const token = await getToken(user.email,user);
    const userToReturn = {...user.toJSON(),token};
    delete userToReturn.password;
    return res.status(200).json(userToReturn);
});

module.exports = router;
