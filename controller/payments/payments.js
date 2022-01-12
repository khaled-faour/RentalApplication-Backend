const pool= require("../../configs/database");

exports.getPayments = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT *
            FROM 
                    all_payments`);
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

exports.addPayment = async(req, res)=>{
    let {paymentDate, orderTo,  note, lease, paymentType, fees, user} = req.body
    const leaseId = lease.id;
    const tenantId = lease.tenant_id;

    let amount = 0;
    fees.map((fee, index)=>{
            amount -= fee.price;
            const keys = Object.keys(fee)
            fees[index]['price'] = -Math.abs(fee.price)
            keys.map(key=>{
                if(key === 'price' || key === 'fee_id'){
                    return ;
                }
                return delete fees[index][key]
            })
    })
    
    try {   
            
            const data = pool.query(
                `CALL add_payment($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
                [amount, paymentDate, orderTo, note, leaseId, paymentType, user, tenantId,JSON.stringify(fees)], (err, result)=>{
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

exports.editPayment = async(req, res)=>{
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

exports.deletePayment = async(req, res)=>{
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
