const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {totalUnits, vacantUnits} = require('../../controller/aggregations/units')

router.get('/total' ,authorization, totalUnits); 
router.get('/vacant' ,authorization, vacantUnits); 


module.exports = router;
