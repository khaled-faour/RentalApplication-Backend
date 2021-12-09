require('dotenv').config()
const jwt = require('jsonwebtoken')


exports.authorization = (req, res, next) => {
    const token = req.cookies.auth;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = data.userId;
      req.login = data.login;
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };