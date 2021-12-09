const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnits, getUnOccupiedUnits, getUnit} = require('../../controller/units/units')

router.get('/', authorization, getUnits); 
router.get('/:id', authorization, getUnit);
router.get('/un-occupied', authorization, getUnOccupiedUnits); 


module.exports = router;
