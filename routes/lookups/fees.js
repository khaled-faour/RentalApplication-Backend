const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getFees, addFee, editFee, deleteFee} = require('../../controller/lookups/fees')

router.get('/' ,authorization, getFees); 

router.post('/' , authorization, addFee); 

router.put('/' , authorization, editFee); 

router.delete('/', authorization, deleteFee)

module.exports = router;
