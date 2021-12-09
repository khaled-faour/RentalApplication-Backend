const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getAppliances, addAppliance, editAppliance, deleteAppliance} = require('../../controller/lookups/appliances')

router.get('/' ,authorization, getAppliances); 

router.post('/' , authorization, addAppliance); 

router.put('/' , authorization, editAppliance); 

router.delete('/', authorization, deleteAppliance);

module.exports = router;
