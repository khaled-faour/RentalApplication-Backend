const pool= require("../../configs/database");

exports.getUnits = async(req, res)=>{
    try {
        const data = await pool.query(
            `SELECT * FROM public.units`);
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


exports.addUnit = async (req, res) => {
        const unit = req.body;
    try {
        console.log(unit)
        const data = await pool.query(
            `CALL add_unit($1)`,
            [JSON.stringify(unit)],
            (err, result)=>{
                if(err){
                    throw err;
                }else{
                    return res.status(200).json({
                        message: `Success`,
                        result
                    });
                }
            });
        console.log(JSON.stringify("Unit: ", unit))
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Unit!", //Database connection error
        });
    }
}

exports.updateUnit = async (req, res)=>{
    console.log("PPPPPPPPPPPPPPPPPPPPPPPP")
    const unit = req.body;
try {

    console.log(unit)
    const data = await pool.query(
        `CALL update_unit($1)`,
        [JSON.stringify({...unit, appliances:[], fees:[]})],
        (err, result) => {
            console.log(JSON.stringify(unit))
            if(err){
                console.log(err)
                throw err;
            }else{
                return res.status(200).json({
                    message: `Success`,
                    result
                });
            }
        });
    console.log(JSON.stringify("Unit: ", unit))
} catch (error) {
    console.log('Error:', error);
    res.status(500).json({
        error: "Database error occurred while adding Unit!", //Database connection error
    });
}
}

exports.deleteUnit= async(req, res)=>{
    const {unit_id} = req.body
    try {
        const data = await pool.query(
            `SELECT delete_unit($1)`,
            [unit_id], 
            (err, result)=>{
                if(err){
                    throw err;
                }
                else{
                    res.status(200).json({
                        result: result.rows[0]['delete_unit']
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting unit!", //Database connection error
        });
    }
}

