const pool= require("../../configs/database");

exports.getRoles = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.users_roles`);
        const rows = data.rows;
        if(rows.length === 0){
            res.json({
                message: 'no data'
            })
        }else{
            res.status(200).json(rows)
        }
        
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching roles!", //Database connection error
        });
    }
}

exports.addRole = async(req, res)=>{
    const {role} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.users_roles (role) VALUES ($1)`, [role], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding role: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "role Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding role!", 
        });
    }
}


exports.editRole = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.users_roles SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Role: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Role updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Role!", //Database connection error
        });
    }
}

exports.deleteRole = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.users_roles WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin role: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "role DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching role!", //Database connection error
        });
    }
}

