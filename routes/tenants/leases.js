const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenantLeases} = require('../../controller/tenants/leases')

router.get('/' ,authorization, getTenantLeases); 

module.exports = router;
    