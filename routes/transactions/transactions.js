const express = require('express')

const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {voidTransaction, payTransaction} = require('../../controller/transactions/transactions')

router.put('/void' , authorization, voidTransaction); 
router.put('/pay' , authorization, payTransaction); 

module.exports = router;