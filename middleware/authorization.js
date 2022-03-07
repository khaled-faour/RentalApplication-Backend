require('dotenv').config()
const {ROLES} = require('../configs/roles')
const jwt = require('jsonwebtoken')


const rolecheck = (req, res, path) => {
  const token = req.cookies.auth;
  const data = jwt.verify(token, process.env.SECRET_KEY);
  
  try {
    const role = data.role;

    if(ROLES[role][req.method].includes(path)){
      return true;
    }
    return false;
  } catch {
    return res.sendStatus(500);
  }
};


exports.authorization = (req, res, next, path) => {
    const token = req.cookies.auth;    
    if (!token) {
      console.log("Not authenticated")
      return res.sendStatus(403);
    }
    try {
      const isAuthorized = path !== null ? rolecheck(req,res,path) : true;
      if(isAuthorized){
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = data.userId;
        req.login = data.login;
        req.role = data.role;
        return next();
      }
      res.status(403).json({
        message: "Action not allowed!"
      })
     
    } catch {
      return res.sendStatus(403);
    }
  };