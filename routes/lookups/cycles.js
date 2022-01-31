const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')

const {getCycles, addCycle, editCycle, deleteCycle} = require('../../controller/lookups/cycles')

router.get('/' ,authorization, getCycles);

router.post('/' , authorization, addCycle);

router.put('/' , authorization, editCycle);

router.delete('/', authorization, deleteCycle);

module.exports = router;
