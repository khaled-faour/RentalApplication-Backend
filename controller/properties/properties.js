const pool= require("../../configs/database");

exports.getProperties = async(req, res)=>{

    //code, type, project, country, city, street, floore, contact
    try {
        const data = await pool.query(
            `SELECT 
                properties.id,
                properties.code,
                properties.country,
                properties.city,
                properties.street,
                properties.floor,
                properties.contact,
                type.description as type,
                project.project_name as project

            FROM 
                public.properties as properties

            JOIN 
                public.property_types as type ON properties.property_type = type.id

            JOIN 
                public.projects as project ON properties.project_id = project.id

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
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}


exports.addProperty = async(req, res)=>{
    const {UForm, PForm} = req.body
    
    try {
            const data = await pool.query(
                `INSERT INTO public.properties (code, property_type,  project_id, country, city, street, floor, contact)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
                [PForm.code, PForm.type, PForm.project, PForm.country, PForm.city, PForm.street, PForm.floor, PForm.contact], (err, result)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error: `Error adding Property: ${err}`
                    })
                }else{
                    const id = result.rows[0].id
                    console.log(`ID: ${id}`)
                    UForm.map((unit, index)=>{
                        pool.query(
                            `INSERT INTO public.units (code, property_id, address, rooms, bathrooms, "SQM", include_appliances, include_fees)
                            VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`, 
                            [unit.number, id, unit.address, unit.rooms, unit.bathrooms, unit.sqm, unit.includeAppliances, unit.includeFees], (err, unitResult)=>{
                                if(err){
                                    console.log(`Error at adding unit: ${err}`)
                                    return res.status(500).json({
                                        error: `Error adding Unit: ${err}`
                                    })
                                }
                                else{
                                    const unitId = unitResult.rows[0].id
                                    var unitFees = []
                                    var unitFeesString;
                                    var unitAppliances = []
                                    var unitAppliancesString;

                                    unit.fees.map(fee=>{
                                        unitFees.push(`(${fee.feeId}, ${unitId}, ${fee.price})`);
                                        
                                    })

                                    console.log(unitFees)
                                    unitFeesString = unitFees.join(',')

                                    pool.query(`INSERT INTO public.unit_fees (fee_id, unit_id, price) VALUES ${unitFeesString}`,[], (err)=>{
                                        if(err){
                                            console.log(`Error at adding fees: ${err}`)
                                            return res.status(500).json({error: `Error inserting fees: ${err}`})
                                        }else{
                                            console.log('added fees')
                                        }
                                    })


                                    
                                    unit.appliances.map(appliance=>{
                                        unitAppliances.push(`(${appliance.applianceId}, ${unitId}, ${appliance.count})`)
                                    })

                                    console.log(unitAppliances)
                                    unitAppliancesString = unitAppliances.join(',')

                                    pool.query(`INSERT INTO public.unit_appliances (appliance_id, unit_id, count) VALUES ${unitAppliancesString}`,[], (err)=>{
                                        if(err){
                                            console.log(`Error at adding appliances: ${err}`)
                                            return res.status(500).json({error: `Error inserting appliances: ${err}`})
                                        }else{
                                            console.log('added  appliances')
                                        }
                                    })

                                    
                                }
                            })
                    })
                    
                    
                    return res.status(200).json({
                        message: "Property Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Property!", 
        });
    }
}

exports.editProperty = async(req, res)=>{
    const {id, description} = req.body
    console.log("ID: ",id, " | ", "Description: ", description)
    
    try {
        const data = await pool.query(`UPDATE public.appliances SET description = $1 WHERE id = $2`, [description, id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error updating Appliance: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Appliance updated!"
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

exports.deleteProperty = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {
        const data = await pool.query(`DELETE FROM public.properties WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting property: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Property DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting properties!", //Database connection error
        });
    }
}

