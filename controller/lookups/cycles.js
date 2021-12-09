const pool= require("../../configs/database");

exports.getCycles = async(req, res)=>{

    try {
        const data = await pool.query(`SELECT * FROM public.cycles`);
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
            error: "Database error occurred while fetching rentCycles!", //Database connection error
        });
    }
}

exports.addCycle = async(req, res)=>{
    const {description} = req.body
    try {
            const data = await pool.query(`INSERT INTO public.cycles (description) VALUES ($1)`, [description], (err)=>{
                if(err){
                    res.status(500).json({
                        error: `Error adding rentCycle: ${err}`
                    })
                }else{
                    res.status(200).json({
                        message: "rentCycle Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding rentCycle!", 
        });
    }
}

exports.editCycle = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.cycles SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Cycle: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Cycle updated!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Cycle!", //Database connection error
        });
    }
}

exports.deleteCycle = async(req, res)=>{
    const {id} = req.body
    try {
        const data = await pool.query(`DELETE FROM public.cycles WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            console.log(result.rows[0])
            if(err){
                res.status(500).json({
                    error: `Error deletgin rentCycle: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "rentCycle DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching rentCycles!", //Database connection error
        });
    }
}

