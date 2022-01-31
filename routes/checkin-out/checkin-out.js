const express = require('express');

const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getCheckInOut} = require('../../controller/checkin-out/checkInOut')

router.get('/', authorization, getCheckInOut);

module.exports = router;