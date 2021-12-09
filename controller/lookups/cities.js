const pool= require("../../configs/database");

exports.getCities = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.cities`);
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
            error: "Database error occurred while fetching cities!", //Database connection error
        });
    }
}

exports.addCity = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.cities (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding city: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "city Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding city!", 
        });
    }
}

exports.editCity = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.cities SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating City: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "City updated!"
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

exports.deleteCity = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.cities WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin city: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "city DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching cities!", //Database connection error
        });
    }
}

