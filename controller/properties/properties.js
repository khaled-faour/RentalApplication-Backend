const { json } = require("express");
const pool= require("../../configs/database");

exports.getProperties = async(req, res)=>{

    //code, type, project, country, city, street, floore, contact
    try {
        const data = await pool.query(
            `SELECT * FROM all_properties`);
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


exports.addProperty = async(req, res)=>{
    const {UForm, PForm} = req.body

    
    try {
        pool.query(`CALL add_property($1, $2)`, [
            `[${JSON.stringify(PForm)}]`,
            JSON.stringify(UForm)
        ], (err, result)=>{
            if(err){
                console.log("Error: ", err)
            }else{
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Property!", 
        });
    }
}

exports.editProperty = async(req, res)=>{
    const data = req.body
    console.log(data)
    try {
        pool.query(`CALL update_property($1)`, [data], (err, result)=>{
            if(err){
                console.log(err)
                res.status(500).json({
                    error: `Error updating property: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Property updated!"
                })
            }
        }); 
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while updating property!", //Database connection error
        });
    }
}

exports.deleteProperty = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {

        pool.query(`DELETE FROM public.properties WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting property: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Property DELETED!"
                })
            }
        });
       
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting properties!", //Database connection error
        });
    }
}

