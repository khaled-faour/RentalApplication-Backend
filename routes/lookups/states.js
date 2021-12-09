const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getStates, addState, editState, deleteState} = require('../../controller/lookups/states')

router.get('/' ,authorization, getStates); 

router.post('/' , authorization, addState); 

router.put('/' , authorization, editState); 

router.delete('/', authorization, deleteState)

module.exports = router;
