const  bcrypt  =  require("bcrypt");

const  client  =  require("../configs/database");

const  jwt  =  require("jsonwebtoken");

//Registration Function

exports.register  =  async (req, res) => {
    const { firstName, lastName, role, login, password, email} =  req.body;
    try {
        const  data  =  await pool.query(`SELECT * FROM public.users WHERE LOWER(Login)= LOWER($1);`, [login]); //Checking if user already exists
        const  arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(400).json({
                error: "Username already there, No need to register again.",
            });
        }else {
            bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                res.status(err).json({
                error: "Server error",
                });
            const  user  = {
                firstName,
                lastName,
                role,
                login,
                password: hash,
                email
            };
            var  flag  =  1; //Declaring a flag

            //Inserting data into the database

            client
            .query(`INSERT INTO public.users (FirstName, LastName, Role, Login, Password, email) VALUES ($1,$2,$3, LOWER($4), $5, $6);`, [ user.firstName, user.lastName, user.role, user.login, user.password, user.email], (err) => {

                if (err) {
                    flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
                    console.error(err);
                    return  res.status(500).json({
                        error: "Database error",
                        messgae: err
                    })
                }else {
                    flag  =  1;
                    res.status(200).send({ message: 'User added to database, not verified' });
                }
            })
            if (flag) {
                const  token  = jwt.sign( //Signing a jwt token
                {
                    login: user.login
                },
                process.env.SECRET_KEY
                );
            };
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
            message: err
        });
    };
}
