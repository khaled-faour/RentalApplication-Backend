const { Client } = require("pg");
const pool= require("../../configs/database");

exports.getLeases = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT * FROM all_leases`);
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

exports.getTenantLeases = async(req, res)=>{
    const {tenant_id} = req.params
    try {
        const data = await pool.query(
            `SELECT * FROM all_leases WHERE tenant_id = ${tenant_id}`);
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

exports.addLease = async(req, res)=>{

    const {unit, tenant,  leaseType, from, to, fees, user, date } = req.body
    console.log("DATA: ", req.body)
    try{
        pool.query(`CALL Add_Draft_Lease($1, $2, $3, $4, $5, $6, $7, $8)`,
            [unit, tenant, leaseType, from, to, user, date, JSON.stringify(fees)], (err, result)=>{
                if (err) {
                    console.log(err)
                    throw err;
                }
                res.status(200).send("Success")
            });
        console.log(req.body)

    } catch (e){
        console.log("An Error Occured: ", e);
        return res.status(500).send("Error: ", e);
    }finally{
        
    }
    
}

exports.editLease = async(req, res)=>{
    const {id, unit, tenant_id,  lease_type, lease_from_date, lease_to_date, fees, user} = req.body;
    const date_updated = new Date().toLocaleDateString("en-CA");
    
    
    try {
        console.log(req.body, date_updated)
        pool.query(`CALL update_draft_lease($1, $2, $3, $4, $5, $6, $7, $8, $9)`, 
        [id, unit, tenant_id,  lease_type, lease_from_date, lease_to_date, JSON.stringify(fees), user, date_updated], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating draft lease: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Draft Lease updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Errorss:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}

exports.deleteLease = async(req, res)=>{
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

