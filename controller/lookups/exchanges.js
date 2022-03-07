const pool= require("../../configs/database");

exports.getAllExchanges = async(req,res)=>{
    try {
        const data = await pool.query(`SELECT * FROM public.exchange`);
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
            error: "Database error occurred while fetching exchangeRates!",
        });
    }
}

exports.addExchangeRate = async(req, res)=>{
    const {} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.exchange (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding exchange rate: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "Exchange Rate Added!"
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
/*
exports.editEchangeRate = async(req, res)=>{
    const {id, cuurency, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.payment_types SET description = $1, 
        WHERE id = $2`, [description, id], (err, result)=>{
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
*/


exports.deleteExchangeRate = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.exchange WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting exchange: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "exchange DELETED!"
                })
            }
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching exchange rates!", //Database connection error
        });
    }
}

