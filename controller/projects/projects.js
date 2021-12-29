const pool= require("../../configs/database");

exports.getProjects = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT *
             FROM all_projects`);
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
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}

exports.addProject = async(req, res)=>{
    const {number, name,  region, country, city, street} = req.body
    
    try {
        console.log()
        const data = await pool.query(
            `CALL add_project ($1, $2, $3, $4, $5, $6)`,
            [number, name,  region, country, city, street], (err, result)=>{
                if(err) throw err
                res.status(200).json({
                    message: "Project Added!"
                })
        });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Project!", 
        });
    }
}

exports.editProject = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.appliances SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Appliance: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Appliance updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}

exports.deleteProject = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {
        const data = await pool.query(`DELETE FROM public.projects WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting project: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Project DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting projects!", //Database connection error
        });
    }
}

