const pool= require("../../configs/database");

exports.getLeaseTypes = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.lease_types`);
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
            error: "Database error occurred while fetching lease_types!", //Database connection error
        });
    }
}

exports.addLeaseType = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.lease_types (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding leaseType: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "leaseType Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding leaseType!", 
        });
    }
}

exports.editLeaseType = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.lease_types SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating LeaseType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "LeaseType updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching LeaseTypes!", //Database connection error
        });
    }
}

exports.deleteLeaseType = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.lease_types WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin leaseType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "leaseType DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching leaseTypes!", //Database connection error
        });
    }
}

