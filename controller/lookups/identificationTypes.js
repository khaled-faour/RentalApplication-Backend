const pool= require("../../configs/database");

exports.getIdentificationTypes = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.identification_types`);
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
            error: "Database error occurred while fetching identification_types!", //Database connection error
        });
    }
}

exports.addIdentificationType = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.identification_types (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding identificationType: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "identificationType Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding identificationType!", 
        });
    }
}

exports.editIdentificationType = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.identification_types SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating IdentificationType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "IdentificationType updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching IdentificationTypes!", //Database connection error
        });
    }
}

exports.deleteIdentificationType = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.identification_types WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin identificationType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "identificationType DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching identificationTypes!", //Database connection error
        });
    }
}

