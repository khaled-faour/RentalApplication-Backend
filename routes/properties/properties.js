const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getProperties, addProperty, editProperty, deleteProperty, getPropertyUnits} = require('../../controller/properties/properties')

router.get('/', (req,res,next)=>authorization(req,res,next, 'properties'), getProperties); 

router.get('/:id/units',(req,res,next)=>authorization(req,res,next, 'properties'), getPropertyUnits);

router.post('/', (req,res,next)=>authorization(req,res,next, 'properties'), addProperty); 

router.put('/', (req,res,next)=>authorization(req,res,next, 'properties'), editProperty); 

router.delete('/', (req,res,next)=>authorization(req,res,next, 'properties'), deleteProperty);

module.exports = router;
