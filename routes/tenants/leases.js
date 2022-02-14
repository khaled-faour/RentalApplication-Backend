const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenantLeases} = require('../../controller/tenants/leases')

router.get('/' ,(req,res,next)=>authorization(req,res,next, 'tenants'), getTenantLeases); 

module.exports = router;
    