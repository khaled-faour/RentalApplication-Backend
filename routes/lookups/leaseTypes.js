const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLeaseTypes, addLeaseType, editLeaseType, deleteLeaseType} = require('../../controller/lookups/leaseTypes')

router.get('/' ,authorization, getLeaseTypes); 

router.post('/' , authorization, addLeaseType); 

router.put('/' , authorization, editLeaseType); 

router.delete('/', authorization, deleteLeaseType)

module.exports = router;
