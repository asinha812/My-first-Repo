const express = require('express');
const router = express.Router();


//@route get api/contacts
//@desc  get all users contact
//@access Private
router.get('/',(req,res)=>{
    res.send('get all contacts');
});

//@route Poat api/contacts
//@desc  add new contact
//@access Private
router.post('/',(req,res)=>{
    res.send('Add contact');
});

//@route put api/contacts/:id
//@desc  update contact
//@access Private
router.put('/:id',(req,res)=>{
    res.send('update contacts');
});

//@route Delete api/contacts/:id
//@desc  update contact
//@access Private
router.delete('/:id',(req,res)=>{
    res.send('Delete contacts');
});

module.exports=router;