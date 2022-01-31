const pool= require("../../configs/database");

exports.activateLease = async(req, res)=>{
    const {lease_id} = req.query;

    try {
        const data = await pool.query(
            `CALL activate_lease($1)`, [lease_id]);
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