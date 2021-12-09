const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenants, addTenant, editTenant, deleteTenant} = require('../../controller/tenants/tenants')

router.get('/' ,authorization, getTenants); 

router.post('/' , authorization, addTenant); 

router.put('/' , authorization, editTenant); 

router.delete('/', authorization, deleteTenant);

module.exports = router;
    