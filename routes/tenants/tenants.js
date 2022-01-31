const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getTenants, getTenant, addTenant, editTenant, deleteTenant} = require('../../controller/tenants/tenants')

router.get('/all' ,authorization, getTenants); 

router.get('/', authorization, getTenant)

router.post('/' , authorization, addTenant); 

router.put('/' , authorization, editTenant); 

router.delete('/', authorization, deleteTenant);

module.exports = router;
    