const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {activateLease} = require('../../controller/leases/activate');

router.get('/' ,(req,res,next)=>authorization(req,res,next, 'lease'), activateLease); 


module.exports = router;