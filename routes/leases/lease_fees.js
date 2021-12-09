const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLease_fees} = require('../../controller/leases/lease_fees')

router.get('/' ,authorization, getLease_fees); 


module.exports = router;