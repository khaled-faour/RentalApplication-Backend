const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnitFees} = require('../../controller/units/unit_fees.js')

router.get('/', authorization, getUnitFees); 


module.exports = router;
