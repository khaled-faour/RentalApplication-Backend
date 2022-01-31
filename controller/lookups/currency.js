const pool= require("../../configs/database");

exports.getAllCurrency = async(req, res)=>{
    try {
        const data = await pool.query(`SELECT * FROM public.currencies`);
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
            error: "Database error occurred while fetching paymentTypes!",
        });
    }
}

exports.addCurrency = async (req, res) => {
    const {code , description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.currencies (code , description) VALUES ($1 , $2)`, [code,description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding currency rate: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "Currency Rate Added!"
                    })
                }
            });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Currrency!",
        });
    }
}

exports.editCurrency = async(req, res)=>{
    const {id, code, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    try {
        const data = await pool.query(`UPDATE public.currencies SET description = $1, code = $2  WHERE id = $3`, [description,code, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Currency: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Currency updated!"
                })
            }
        });   
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while updating Currency!", //Database connection error
        });
    }
}

exports.deleteCurrency = async(req, res) => {

    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.currencies WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deleting: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Currency DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching paymentTypes!", //Database connection error
        });
    }
}

