const express = require('express');

const router = express.Router();

const {authorization} = require('../../middleware/authorization');

const {getAllCurrency} = require('../../controller/lookups/currency');

const {addCurrency} = require('../../controller/lookups/currency');

const {editCurrency} = require('../../controller/lookups/currency');

const {deleteCurrency} = require('../../controller/lookups/currency')

router.get('/' , getAllCurrency);

router.post('/' , addCurrency);

router.put('/' , editCurrency);

router.delete('/' , deleteCurrency);



module.exports = router;