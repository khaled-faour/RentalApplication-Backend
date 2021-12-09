const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getRegions, addRegion, editRegion, deleteRegion} = require('../../controller/lookups/regions')

router.get('/' ,authorization, getRegions); 

router.post('/' , authorization, addRegion); 

router.put('/' , authorization, editRegion); 

router.delete('/', authorization, deleteRegion);



module.exports = router;
