const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUsers, getUser, editUser} = require('../../controller/users/users')

router.get('/all', (req,res,next)=>authorization(req,res,next, 'users'), getUsers); 
router.get('/', (req,res,next)=>authorization(req,res,next, 'users'), getUser); 
router.put('/', (req,res,next)=>authorization(req,res,next, 'users'), editUser); 


module.exports = router;
