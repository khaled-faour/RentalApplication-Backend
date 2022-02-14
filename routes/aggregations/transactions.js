const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization');
const {totalTransactions, totalReceipts, totalPayments, recentTransactions, recentVoidedTransactions} = require('../../controller/aggregations/transactions');

router.get('/total' ,authorization, totalTransactions); 
router.get('/totalReceipts' ,authorization, totalReceipts); 
router.get('/totalPayments', authorization, totalPayments);
router.get('/recent', authorization, recentTransactions);
router.get('/recentVoids', authorization, recentVoidedTransactions);

module.exports = router;
