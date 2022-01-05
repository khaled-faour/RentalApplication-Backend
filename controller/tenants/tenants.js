const pool= require("../../configs/database");


exports.getTenant = async(req, res)=>{
    const {id} = req.query;
    try {
        const data = await pool.query(
            `SELECT * FROM all_tenants WHERE id = ${id}`);
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
            error: "Database error occurred while fetching Tenant!", //Database connection error
        });
    }
}

exports.getTenants = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT * FROM all_tenants`);
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
            error: "Database error occurred while fetching Tenants!", //Database connection error
        });
    }
}

exports.addTenant = async(req, res)=>{
    const {firstName, lastName, residentCenterStatus, textMessageStatus, identificationType, user, emails, phones} = req.body
    
    try {
            pool.query(
                `CALL Add_Tenant($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    firstName, 
                    lastName, 
                    identificationType, 
                    user, 
                    residentCenterStatus, 
                    textMessageStatus, 
                    JSON.stringify(phones), 
                    JSON.stringify(emails)
                ], (err, result)=>{
                if(err){
                    throw err;
                   
                }else{
                    return res.status(200).json({
                        message: `Success`,
                        result
                    });
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Appliance!", 
        });
    }
}

exports.editTenant = async(req, res)=>{
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

exports.deleteTenant = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {
        const data = await pool.query(`DELETE FROM public.tenants WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting tenant: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Tenant DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting tenants!", //Database connection error
        });
    }
}

