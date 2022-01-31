const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getReceipts, addReceipt, editReceipt, deleteReceipt} = require('../../controller/receipts/receipts')

router.get('/' ,authorization, getReceipts); 

router.post('/' , authorization, addReceipt); 

router.put('/' , authorization, editReceipt); 

router.delete('/', authorization, deleteReceipt);

module.exports = router;
