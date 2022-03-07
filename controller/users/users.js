const pool= require("../../configs/database");

exports.getUsers = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT
                public.users.id,
                CONCAT(firstname, ' ', lastname) AS name,
                login AS username,
                email,
                roles.description AS role
            FROM 
                public.users

            JOIN 
                public.users_roles AS roles ON role = roles.id
            `);
        const rows = data.rows;
        if(rows.length === 0){
            res.json({
                message: 'no users'
            })
        }else{
            res.status(200).json(rows)
        }
        
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Users!", //Database connection error
        });
    }
}


exports.getUser = async(req, res)=>{
    const {id} = req.query;
    try {
        const data = await pool.query(
            `SELECT
                id,
                firstname,
                lastname,
                login AS username,
                email,
                role
            FROM 
                public.users
            WHERE users.id = ${id}
            `);
        const rows = data.rows;
        if(rows.length === 0){
            res.json({
                message: 'no users'
            })
        }else{
            res.status(200).json(rows)
        }
        
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching User!", //Database connection error
        });
    }
}


exports.editUser = async(req, res)=>{
    const {id, firstname, lastname, email, username, role} = req.body || null;
    try {
        const data = await pool.query(`CALL UPDATE_USER($1)`, 
        [req.body],(err, result)=>{
            if(err){
                console.log("Error: ", err)
                res.status(500).json({
                    error: `Error updating User: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "User updated!"
                })
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while updating user!", //Database connection error
        });
    }
}