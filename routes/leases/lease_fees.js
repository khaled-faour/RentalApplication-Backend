const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLease_fees} = require('../../controller/leases/lease_fees')

router.get('/' ,(req,res,next)=>authorization(req,res,next, 'leases'), getLease_fees); 


module.exports = router;