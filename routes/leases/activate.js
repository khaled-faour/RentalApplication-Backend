const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {activateLease} = require('../../controller/leases/activate');

router.get('/' ,authorization, activateLease); 


module.exports = router;