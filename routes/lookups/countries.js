const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getCountries, addCountry, editCountry, deleteCountry} = require('../../controller/lookups/countries')

router.get('/' ,authorization, getCountries); 

router.post('/' , authorization, addCountry); 

router.put('/' , authorization, editCountry); 

router.delete('/', authorization, deleteCountry);



module.exports = router;
