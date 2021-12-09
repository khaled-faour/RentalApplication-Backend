const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const {authorization} = require('../middleware/authorization')



router.get('/', (req,res)=>{
    res.send("No Route Here")
})
router.get('/public' , (req,res)=>{
    res.send("Public Route")
}); //POST request to register the user

router.get('/private' , authorization,(req, res)=>{

    res.status(200).send("Private Route")
    
}); // POST request to login the user



module.exports = router;
