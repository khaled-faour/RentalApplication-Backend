const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUsers} = require('../../controller/users/users')

router.get('/', (req,res,next)=>authorization(req,res,next, 'users'), getUsers); 


module.exports = router;
