const { json } = require("express");
const pool= require("../../configs/database");


exports.getPropertyUnits = async(req, res)=>{
    const {id} = req.params;

    try {
        const data = await pool.query(
            `SELECT *
             FROM 
                public.all_units
             WHERE property_id = ${id}
             `);
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
            error: "Database error occurred while fetching units!", //Database connection error
        });
    }
}

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


exports.addProperty = async(req, res) => {
    const {UForm, PForm} = req.body
    try {
        pool.query(`CALL add_property($1, $2)`, [
            `[${JSON.stringify(PForm)}]`,
            JSON.stringify(UForm)
        ], (err, result)=>{
            if(err){
                console.log("OOOOOO")
               console.log("Error: ", err)
            }else{
                res.status(200).json({
                    message: "Success",
                });
            }
        });
    } catch (error) {
        console.log('Error11:', error);
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
    const {property_id} = req.body
    try {
        const data = await pool.query(
            `SELECT delete_property($1)`, [property_id],
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['delete_property']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting property!", //Database connection error
        });
    }
}

