const express = require('express')

const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {voidTransaction} = require('../../controller/transactions/transactions')

router.put('/void' , authorization, voidTransaction); 

module.exports = router;