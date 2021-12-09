const pool= require("../../configs/database");

exports.getUnitFees = async(req, res)=>{

    const unitId = req.query.unitId
    try {
        const data = await pool.query(
            `SELECT *
            FROM 
                public.unit_fees
            
            JOIN public.fees fees ON fees.id = fee_id
            WHERE unit_id = $1
             `, [unitId]);
        const rows = data.rows;
        if(rows.length === 0){
            res.json({
                message: 'no data'
            })
        }else{
            console.log(rows)
            res.status(200).json(rows)
        }
        
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching unit fees!", //Database connection error
        });
    }
}

