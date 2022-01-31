const pool= require("../../configs/database");


exports.getLease_fees = async(req, res) => {
    const {lease_id} = req.query
    try {
        const data = await pool.query(
            `SELECT DISTINCT fee_id, lease_id, price, fees.description FROM public.lease_fees
             JOIN public.fees as fees ON fees.id = fee_id 
             WHERE lease_id = ${lease_id}`);
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
            error: "Database error occurred while fetching Lease_fees!", //Database connection error
        });
    }
}