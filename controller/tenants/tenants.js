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
    const {name, residentCenterStatus, textMessageStatus, identificationType, user, emails, phones} = req.body || null;
    console.log(req.body);
    try {
            pool.query(
                `CALL Add_Tenant($1, $2, $3, $4, $5, $6, $7)`,
                [
                    name,
                    identificationType, 
                    user, 
                    residentCenterStatus, 
                    textMessageStatus, 
                    phones.join(),
                    emails.join()
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

exports.editTenant = async(req, res) => {
    const {id, name, residentCenterStatus, textMessageStatus, identification_type, user, emails, phones} = req.body || null;
    try {
        const data = await pool.query(`CALL UPDATE_TENANT($1, $2, $3, $4, $5, $6, $7, $8)`, 
        [   id,
            name,
            identification_type,
            user,
            residentCenterStatus,
            textMessageStatus,
            phones.join(),
            emails.join()
        ],(err, result)=>{
            if(err){
                console.log("Error: ", err)
                res.status(500).json({
                    error: `Error updating Tenant: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Tenant updated!"
                })
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while updating tenant!", //Database connection error
        });
    }
}

exports.deleteTenant = async(req, res)=>{
    const {tenant_id} = req.body
    try {
        const data = await pool.query(
            `SELECT delete_tenant($1)`, [tenant_id],
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['delete_tenant']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting tenant!", //Database connection error
        });
    }
}

