const pool= require("../../configs/database");

exports.getCountries = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.countries`);
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
            error: "Database error occurred while fetching countries!", //Database connection error
        });
    }
}

exports.addCountry = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.countries (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding country: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "Country Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding country!", 
        });
    }
}

exports.editCountry = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.countries SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Country: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Country updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Countries!", //Database connection error
        });
    }
}

exports.deleteCountry = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.countries WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin country: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Country DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching countries!", //Database connection error
        });
    }
}

