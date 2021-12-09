const pool= require("../../configs/database");
const { map } = require("../../routes/lookups");

exports.getPayments = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT *
            FROM 
                    public.payments`);
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
    const {paymentDate, receivedFrom,  note, lease, paymentType, fees, user} = req.body
    const leaseId = lease.id;
    const tenantId = lease.tenant_id;
    let amount = 0;
    fees.map(fee=>{
        amount += fee.price;
    })
    
    try {   
            console.log(req.body)
            const data = await pool.query(
                `INSERT INTO public.payments (amount, payment_date, received_from, notes, lease_id, payment_type, "user", tenant_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
                [amount, paymentDate, receivedFrom,  note, leaseId, paymentType, user, tenantId], (err, result)=>{
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            error: `Error adding payment: ${err}`
                        })
                    }else{
                        res.status(200).json({
                            message: "Payment Added!"
                        })
                    }
            });
        
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

