const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {getProjects, addProject, editProject, deleteProject} = require('../../controller/projects/projects')

router.get('/' ,authorization, getProjects); 

router.post('/' , authorization, addProject); 

router.put('/' , authorization, editProject); 

router.delete('/', authorization, deleteProject);

module.exports = router;
