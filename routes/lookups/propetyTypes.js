const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getPropertyTypes, addPropertyType, editPropertyType, deletePropertyType} = require('../../controller/lookups/propertyType')

router.get('/' ,authorization, getPropertyTypes); 

router.post('/' , authorization, addPropertyType); 

router.put('/' , authorization, editPropertyType); 

router.delete('/', authorization, deletePropertyType);

module.exports = router;
