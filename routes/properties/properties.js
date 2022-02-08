const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getProperties, addProperty, editProperty, deleteProperty, getPropertyUnits} = require('../../controller/properties/properties')

router.get('/', authorization, getProperties); 

router.get('/:id/units', authorization, getPropertyUnits);

router.post('/', authorization, addProperty); 

router.put('/', authorization, editProperty); 

router.delete('/', authorization, deleteProperty);

module.exports = router;
