const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnits, getUnOccupiedUnits, addUnit, deleteUnit, updateUnit} = require('../../controller/units/units')

router.get('/', authorization, getUnits); 
router.get('/un-occupied', authorization, getUnOccupiedUnits); 

router.post('/', authorization, addUnit);

router.delete('/', authorization, deleteUnit);

router.put('/', authorization, updateUnit);

module.exports = router;
