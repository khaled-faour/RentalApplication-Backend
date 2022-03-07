const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUnits, getUnOccupiedUnits, addUnit, deleteUnit, updateUnit} = require('../../controller/units/units')

router.get('/', (req,res,next)=>authorization(req,res,next, 'units'), getUnits); 
router.get('/un-occupied', (req,res,next)=>authorization(req,res,next, 'units'), getUnOccupiedUnits); 

router.post('/', (req,res,next)=>authorization(req,res,next, 'units'), addUnit);

router.delete('/', (req,res,next)=>authorization(req,res,next, 'units'), deleteUnit);

router.put('/', (req,res,next)=>authorization(req,res,next, 'units'), updateUnit);

module.exports = router;
