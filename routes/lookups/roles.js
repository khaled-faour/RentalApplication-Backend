const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getRoles, addRole, editRole, deleteRole} = require('../../controller/lookups/roles')

router.get('/' ,authorization, getRoles); 

router.post('/' , authorization, addRole); 

router.put('/' , authorization, editRole); 

router.delete('/', authorization, deleteRole);

module.exports = router;
