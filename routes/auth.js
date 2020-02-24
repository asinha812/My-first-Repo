const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const config=require('config');
const auth=require('../middleware/auth');



//@route Get api/auth
//@desc Get logged in user
//@access Private
router.get('/',auth,
async(req,res)=>{
    try {
        //if token is correct returs user of that token
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});


//@route post api/auth
//@desc Auth user and get tokn
//@access Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password','Password is required').exists()
],
async(req,res)=>{ //aynsc is used to use await and bcrypt using mongoose
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    //take email and password from body
    const {email,password}=req.body;

    try {
        let user= await User.findOne({email});

        //check email
        if(!user){
            return res.status(400).json({msg:'Invalid Credentials'});
        }
        //if user present
        //check password
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }

        const payload ={
            user:{
                id:user.id
            }
        }
        //create a jwt and sign in 
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:360000
        },(err,token)=>{
            if (err) throw err;
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

});
module.exports=router;