const pool= require("../../configs/database");
const { map } = require("../../routes/lookups");

exports.getReceipts = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT *
            FROM 
                    all_receipts`);
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

exports.addReceipt = async(req, res)=>{
    let {paymentDate, receivedFrom,  note, lease, paymentType, fees, user} = req.body
    const leaseId = lease.id;
    const tenantId = lease.tenant_id;

    let amount = 0;
    fees.map((fee, index)=>{
            amount += fee.price;
            const keys = Object.keys(fee)
            keys.map(key=>{
                if(key === 'price' || key === 'fee_id' || key==='description'){
                    return ;
                }
                return delete fees[index][key]
            })
    })
    
    try {   
            
        console.log(req.body)
            const data = pool.query(
                `CALL add_receipt($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [amount, paymentDate, receivedFrom,  note, leaseId, paymentType, user, tenantId, JSON.stringify(fees)], (err, result)=>{
                    if(err) throw err;
                    
                    res.status(200).send("Success")
            })
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Payment!", 
        });
    }
}

exports.editReceipt = async(req, res)=>{
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

exports.deleteReceipt = async(req, res)=>{
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

