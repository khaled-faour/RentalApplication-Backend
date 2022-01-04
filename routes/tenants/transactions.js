const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenantTransactions} = require('../../controller/tenants/transactions')

router.get('/' ,authorization, getTenantTransactions); 

module.exports = router;
    