const pool= require("../../configs/database");

exports.getUnits = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT *
            FROM 
                public.units
             `);
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
            error: "Database error occurred while fetching units!", //Database connection error
        });
    }
}

exports.getUnit = async(req, res)=>{
    const {id} = req.params;

    try {
        const data = await pool.query(
            `SELECT *
             FROM 
                public.units
             WHERE property_id = ${id}
             `);
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
            error: "Database error occurred while fetching units!", //Database connection error
        });
    }
}

exports.getUnOccupiedUnits = async (req, res)=>{
    try {

        const data = await pool.query(
            `SELECT *
             FROM 
                public.units
            WHERE occupancy_status IS NOT TRUE`
            );
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
            error: "Database error occurred while fetching Unoccupied Units!", //Database connection error
        });
    }
}

