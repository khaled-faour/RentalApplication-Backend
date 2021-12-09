const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getCities, addCity, editCity, deleteCity} = require('../../controller/lookups/cities')

router.get('/' ,authorization, getCities); 

router.post('/' , authorization, addCity); 

router.put('/' , authorization, editCity); 

router.delete('/', authorization, deleteCity)

module.exports = router;
