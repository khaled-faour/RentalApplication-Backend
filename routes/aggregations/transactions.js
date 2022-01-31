const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization');
const {totalTransactions, totalReceipts, totalPayments, recentTransactions} = require('../../controller/aggregations/transactions');

router.get('/total' ,authorization, totalTransactions); 
router.get('/totalReceipts' ,authorization, totalReceipts); 
router.get('/totalPayments', authorization, totalPayments);
router.get('/recent', authorization, recentTransactions);

module.exports = router;
