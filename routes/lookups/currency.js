const express = require('express');

const router = express.Router();

const {authorization} = require('../../middleware/authorization');

const {getAllCurrency} = require('../../controller/lookups/currency');

const {addCurrency} = require('../../controller/lookups/currency');

const {editCurrency} = require('../../controller/lookups/currency');

const {deleteCurrency} = require('../../controller/lookups/currency');

router.get('/', /* authorization, */ getAllCurrency);

router.post('/' ,/* authorization, */ addCurrency);

router.put('/' ,/* authorization, */ editCurrency);

router.delete('/' ,/* authorization, */ deleteCurrency);



module.exports = router;