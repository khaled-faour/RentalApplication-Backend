const pool= require("../../configs/database");


exports.voidTransaction = async(req, res)=>{
    const {transaction_id} = req.body
    try {
        const data = await pool.query(
            `SELECT void_transaction($1)`, [transaction_id],
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['void_transaction']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while voiding transaction!", //Database connection error
        });
    }
}

exports.payTransaction = async(req, res)=>{
    const {transaction_id} = req.body
    try {
        const data = await pool.query(
            `SELECT pay_transaction($1)`, [transaction_id],
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['pay_transaction']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while paying transaction!", //Database connection error
        });
    }
}

