const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenants, getTenant, addTenant, editTenant, deleteTenant} = require('../../controller/tenants/tenants')

router.get('/all' ,(req,res,next)=>authorization(req,res,next, 'tenants'), getTenants); 

router.get('/', (req,res,next)=>authorization(req,res,next, 'tenants'), getTenant)

router.post('/' , (req,res,next)=>authorization(req,res,next, 'tenants'), addTenant); 

router.put('/' , (req,res,next)=>authorization(req,res,next, 'tenants'), editTenant); 

router.delete('/', (req,res,next)=>authorization(req,res,next, 'tenants'), deleteTenant);

module.exports = router;
    