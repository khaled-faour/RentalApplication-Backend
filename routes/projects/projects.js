const express = require('express');
const router = express.Router();

const {authorization} = require('../../middleware/authorization')
const {rolecheck} = require('../../middleware/rolecheck')
const {getProjects, getProject, addProject, editProject, deleteProject} = require('../../controller/projects/projects')

router.get('/all', (req,res,next)=>authorization(req,res,next, 'projects'), getProjects); 

router.get('/', (req,res,next)=>authorization(req,res,next, 'projects'), getProject);

router.post('/', (req,res,next)=>authorization(req,res,next, 'projects'), addProject); 

router.put('/', (req,res,next)=>authorization(req,res,next, 'projects'), editProject); 

router.delete('/', (req,res,next)=>authorization(req,res,next, 'projects'), deleteProject);

module.exports = router;
