const router = require('express').Router();
const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../model/User');
const userModel = require('../model/User');
const {registerValidation,loginValidation} = require('../Validation.JS')
const jwt =require('jsonwebtoken');

require('dotenv').config()
//validation


router.post('/register',  async (req,res)=>{
    

    //Lets validate the data before a user
    const {error}  = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    else{


        //check i fthe userr is in the database

        const emailExist = await User.findOne({email:req.body.email});
        if(emailExist) return res.status(400).send("email already exists");

        //Hash passwords
        const salt  = await bcrypt.genSalt(10);
        const hashPasswords = await bcrypt.hash(req.body.password,salt);
        console.log(hashPasswords)

     //Create a new User
    const user = new userModel({
        name:req.body.name,
        email:req.body.email,
        password:hashPasswords
    });
        try{
             const saveUser=await user.save()
             res.send(`Added succesfullt${saveUser._id}`)
        }
        catch(err){
            res.send(400).send(`Error occurres ${err}`)
        }
        
        
    }
    
    

});
//Login
router.post('/login',async (req,res)=>{
    //Lets validate the data before a login
    const {error}  = loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    //checking if email exists
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email or passwprd is wrong')
    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send("Invalid passsword");

    //create and assign a token

    const token =jwt.sign({
        _id:user._id
    },process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token)

    

})


module.exports = router;