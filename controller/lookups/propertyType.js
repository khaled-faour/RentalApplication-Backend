const pool= require("../../configs/database");

exports.getPropertyTypes = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.property_types`);
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
            error: "Database error occurred while fetching propertyTypes!", //Database connection error
        });
    }
}

exports.addPropertyType = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.property_types (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding propertyType: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "propertyType Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding propertyType!", 
        });
    }
}

exports.editPropertyType = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.property_types SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating ProperyType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "PropertyType updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}

exports.deletePropertyType = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.property_types WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin propertyType: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "propertyType DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching propertyTypes!", //Database connection error
        });
    }
}

