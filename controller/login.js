const bcrypt = require("bcrypt");
const pool= require("../configs/database");
const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
    console.log("COOKIE: ", req.cookies)
    const { login, password } = req.body;
    try {
        const data = await pool.query(`SELECT * FROM public.users WHERE LOWER(Login)= LOWER($1);`, [login]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.status(400).json({
                error: "User is not registered, Sign Up first",
            });
        }else {
            bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                if (err) {
                    res.status(500).json({
                        error: "Server error",
                    });
                } else if (result === true) { //Checking if credentials match
                    const token = jwt.sign(
                        {userId: user[0].id, login: login},
                        process.env.SECRET_KEY, 
                        { expiresIn: "5h" }
                    );
                    res.cookie('auth', token, {httpOnly: true}).status(200).json({
                        token: token,
                        ...jwt.decode(token)
                    });
                    
                }else {
                    //Declaring the errors
                    if (result != true)
                    res.status(400).json({
                        error: "Enter correct password!",
                    });
                }
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
};
