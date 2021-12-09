const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getIdentificationTypes, addIdentificationType, editIdentificationType, deleteIdentificationType} = require('../../controller/lookups/identificationTypes')

router.get('/' ,authorization, getIdentificationTypes); 

router.post('/' , authorization, addIdentificationType); 

router.put('/' , authorization, editIdentificationType); 

router.delete('/', authorization, deleteIdentificationType)



module.exports = router;
