const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getPaymentTypes, addPaymentType, editPaymentType, deletePaymentType} = require('../../controller/lookups/paymentTypes')

router.get('/' ,authorization, getPaymentTypes); 

router.post('/' , authorization, addPaymentType); 

router.put('/' , authorization, editPaymentType); 

router.delete('/', authorization, deletePaymentType);

module.exports = router;
