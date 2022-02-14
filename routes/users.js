const express = require('express');

const router = express.Router();

const {register} = require("../controller/register");

const {login} = require("../controller/login");

const {authorization} = require("../middleware/authorization")

router.post('/register', authorization, register); //POST request to register the user

router.post('/login' , login); // POST request to login the user

router.get("/logout", (req, res) => {
    return res
      .clearCookie("auth")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  });

module.exports = router;
