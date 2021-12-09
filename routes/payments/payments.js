const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getPayments, addPayment, editPayment, deletePayment} = require('../../controller/payments/payments')

router.get('/' ,authorization, getPayments); 

router.post('/' , authorization, addPayment); 

router.put('/' , authorization, editPayment); 

router.delete('/', authorization, deletePayment);

module.exports = router;
