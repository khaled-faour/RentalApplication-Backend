const pool= require("../../configs/database");
const { response } = require("../../routes/lookups");
const { uploadFiles, deleteFiles } = require("../files");

exports.getProject = async(req, res)=>{

    const {id} = req.query;

    try {
        const data = await pool.query(
            `SELECT *
             FROM all_projects WHERE id = ${id}`);
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
    const {number, name,  region, country, city, street, files = []} = req.body
    var filesArray = [];
    var filesNames = [];
    try {

        const data = await pool.query(
            `CALL add_project ($1, $2, $3, $4, $5, $6)`,
            [number, name,  region, country, city, street], (err, result)=>{
                if(err) throw err
                res.status(200).json({
                    message: "Project Added!"
                });
        });
        
    } catch (error) {
        console.log('Error:', error);
        deleteFiles(filesNames, 'projects')
        res.status(500).json({
            error: "Database error occurred while adding Project!", 
        });
    }
}

exports.editProject = async(req, res)=>{

    const {city_id, country_id, id, name, number, region_id, street} = req.body

    
    try {
        const data = await pool.query(`CALL UPDATE_PROJECT($1, $2, $3, $4, $5, $6, $7)`, [id, name, region_id, number, country_id, street, city_id], (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    error: `Error updating project: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Project updated!"
                })
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while updating project!", //Database connection error
        });
    }
}

exports.deleteProject = async(req, res)=>{
    const {project_id} = req.body
    try {
        const data = await pool.query(
            `SELECT delete_project($1)`, [project_id],
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['delete_project']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting project!", //Database connection error
        });
    }
}

