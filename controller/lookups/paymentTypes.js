const pool= require("../../configs/database");

exports.getPaymentTypes = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.payment_types`);
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
            error: "Database error occurred while fetching paymentTypes!", //Database connection error
        });
    }
}

exports.addPaymentType = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.payment_types (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding paymentType: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "paymentType Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding paymentType!", 
        });
    }
}

exports.editPaymentType = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.payment_types SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating PaymentType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "PaymentType updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching PaymentTypes!", //Database connection error
        });
    }
}

exports.deletePaymentType = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.payment_types WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin paymentType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "paymentType DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching paymentTypes!", //Database connection error
        });
    }
}

