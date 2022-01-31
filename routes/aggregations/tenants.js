const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {totalTenants} = require('../../controller/aggregations/tenants')

router.get('/total' ,authorization, totalTenants); 

module.exports = router;
