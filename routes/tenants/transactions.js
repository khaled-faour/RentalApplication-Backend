const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenantTransactions} = require('../../controller/tenants/transactions')

router.get('/' ,(req,res,next)=>authorization(req,res,next, 'transactions'), getTenantTransactions); 

module.exports = router;
    