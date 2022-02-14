const bcrypt = require("bcrypt");
const pool= require("../configs/database");
const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
    console.log("COOKIE: ", req.cookies)
    const { login, password, remember } = req.body;
    try {
        const data = await pool.query(`SELECT * FROM public.all_users WHERE LOWER(Login)= LOWER($1);`, [login]) //Verifying if the user exists in the database
        const user = data.rows;
        if (user.length === 0) {
            res.json({
                status: 400,
                error: "Username not found!",
            });
        }else {
            if(user[0].status !== "Active"){
                res.json({
                    status: 403,
                    error: "User is not active"
                })
            }else{
                bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
                    if (err) {
                        res.json({
                            status: 500,
                            error: "Server error",
                        });
                    } else if (result === true) { //Checking if credentials match
                            let token;
                            if(remember){
                                token = jwt.sign(
                                    {userId: user[0].id, login: login, role: user[0].role},
                                    process.env.SECRET_KEY, 
                                );
                            }else{
                                token = jwt.sign(
                                    {userId: user[0].id, login: login, role: user[0].role},
                                    process.env.SECRET_KEY, 
                                    { expiresIn: "5h" }
                                );
                            }
                        res.cookie('auth', token, {httpOnly: true}).status(200).json({
                            status: 200,
                            token: token,
                            ...jwt.decode(token)
                        });
                        console.log(jwt.decode(token));
                    }else {
                        //Declaring the errors
                        if (result != true)
                        res.json({
                            status: 400,
                            error: "Incorrect password!",
                        });
                    }
                })
            }
        }
    } catch (err) {
        console.log(err);
        res.json({
            status: 500,
            error: "Database error occurred while signing in!", //Database connection error
        });
    };
};
