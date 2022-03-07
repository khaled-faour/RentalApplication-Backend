const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnitAppliances} = require('../../controller/units/unit_appliances.js')

router.get('/', (req,res,next)=>authorization(req,res,next, 'units'), getUnitAppliances); 


module.exports = router;
