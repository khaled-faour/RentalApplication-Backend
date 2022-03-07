require('dotenv').config()
const {ROLES} = require('../configs/roles');
const jwt = require('jsonwebtoken')


exports.rolecheck = (req, res, next) => {
    const token = req.cookies.auth;
    const data = jwt.verify(token, process.env.SECRET_KEY);
    
    console.log("REQUEST: ", req.query)
    try {
    const role = data.role;

      if(ROLES[role][req.method].includes('projects')){
        console.log(`[${role}] : ALLOWED ON METHOD ***${req.method}***`)
        return next()
      }

      return res.status(403).json({
        message: "Action not allowed."
      });

    } catch {
      return res.sendStatus(500);
    }
  };