const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLeases, addLease, editLease, deleteLease} = require('../../controller/leases/leases')

router.get('/' ,authorization, getLeases); 

router.post('/' , authorization, addLease); 

router.put('/' , authorization, editLease); 

router.delete('/', authorization, deleteLease);

module.exports = router;