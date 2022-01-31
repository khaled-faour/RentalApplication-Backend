const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnitAppliances} = require('../../controller/units/unit_appliances.js')

router.get('/', authorization, getUnitAppliances); 


module.exports = router;
