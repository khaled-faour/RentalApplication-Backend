const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getLeases, addLease, editLease, deleteLease, getTenantLeases} = require('../../controller/leases/leases')

router.get('/' ,(req,res,next)=>authorization(req,res,next, 'leases'), getLeases); 
router.get('/:tenant_id', (req,res,next)=>authorization(req,res,next, 'leases'), getTenantLeases)

router.post('/' , (req,res,next)=>authorization(req,res,next, 'leases'), addLease); 

router.put('/' , (req,res,next)=>authorization(req,res,next, 'leases'), editLease); 

router.delete('/', (req,res,next)=>authorization(req,res,next, 'leases'), deleteLease);

module.exports = router;