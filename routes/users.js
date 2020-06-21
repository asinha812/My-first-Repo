const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs');
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const config=require('config');

//@route Post api/users
//@desc Register user
//@access Public
router.post('/',[
    check('name','Enter a name!').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Password should have minimum of six characters.').isLength({min:6})
],
async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    //destruct the data coming from input
    const {name,email,password}=req.body;

    try {
        let user = await User.findOne({email});

        //if user exists
        if(user){
            return res.status(400).json({msg:'User already exists'});
        }
        //else
        user = new User({
            name,
            email,
            password
        });
    
        //decrypt password using bcrypt
        const salt= await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        //save it all in db
        await user.save();

        //create payload ,object sent in token
        const payload ={
            user:{
                id:user.id
            }
        }
        //create a jwt and sign in 
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:360000
        },(err,token)=>{
            if (err)throw err;
            res.json({token});
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// changes made
<<<<<<< HEAD
//a
=======
//aditya
>>>>>>> 8bfc18b64cedc47cd4107aaefea460433670d640

module.exports=router;
