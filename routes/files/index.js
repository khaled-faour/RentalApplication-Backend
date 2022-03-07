const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {upload, getFile} = require('../../controller/files')

router.post('/:path', authorization, upload); 
router.get('/', authorization, getFile); 


module.exports = router;
