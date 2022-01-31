const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLeases, addLease, editLease, deleteLease, getTenantLeases} = require('../../controller/leases/draft_leases');

router.get('/' ,authorization, getLeases); 
router.get('/:tenant_id', authorization, getTenantLeases);

router.post('/' , authorization, addLease); 

router.put('/' , authorization, editLease); 

router.delete('/', authorization, deleteLease);

module.exports = router;