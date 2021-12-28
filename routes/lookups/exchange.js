const express = require('express');

const router = express.Router();

const {authorization} = require('../../middleware/authorization');

const {getAllExchanges} = require('../../controller/lookups/exchanges');

const {deleteExchangeRate} = require('../../controller/lookups/exchanges');

router.get('/' ,authorization, getAllExchanges);

router.delete('/' , deleteExchangeRate);

module.exports = router;