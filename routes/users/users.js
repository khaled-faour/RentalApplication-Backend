const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getUsers} = require('../../controller/users/users')

router.get('/', authorization, getUsers); 


module.exports = router;
