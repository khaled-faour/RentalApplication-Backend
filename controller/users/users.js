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

