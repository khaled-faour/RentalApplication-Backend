const pool= require("../../configs/database");


exports.getTenantLeases = async(req, res)=>{
    const {id} = req.query;
    
    try {
        const data = await pool.query(
            `SELECT * FROM all_leases WHERE tenant_id = ${id}`);
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