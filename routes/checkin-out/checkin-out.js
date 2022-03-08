const express = require('express');

const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getCheckInOut} = require('../../controller/checkin-out/checkInOut')
const {addCheckIn} = require('../../controller/checkin-out/checkInOut')

router.get('/', authorization, getCheckInOut);

router.post('/', authorization, addCheckIn)

module.exports = router;