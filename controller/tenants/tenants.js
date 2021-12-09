const pool= require("../../configs/database");

exports.getTenants = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT id, 
            CONCAT(first_name, ' ', last_name) AS name, 
            identification_type,
            user,
            resident_center_state,
            text_message_state,
            (SELECT ARRAY(SELECT email FROM public.tenant_email WHERE tenant_id = public.tenants.id) as emails),
            (SELECT ARRAY(SELECT phone FROM public.tenant_phone WHERE tenant_id = public.tenants.id) as phones)
            FROM 
            public.tenants`);
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

exports.addTenant = async(req, res)=>{
    const {firstName, lastName, residentCenterStatus, textMessageStatus, identificationType, user, emails, phones} = req.body
    
    try {
            const data = await pool.query(
                `INSERT INTO public.tenants (first_name, last_name,  identification_type, "user", resident_center_state, text_message_state)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
                [firstName, lastName, identificationType, user, residentCenterStatus, textMessageStatus], (err, result)=>{
                if(err){
                    console.log(err)
                    return res.status(500).json({
                        error: `Error adding Tenant: ${err}`
                    })
                }else{
                    const id = result.rows[0].id
                    
                    //INSERT PHONES
                    var phonesArray = [];

                    phones.map(phone=>{
                        phonesArray.push(`(${id}, ${phone})`);
                    });

                    const phonesString = phonesArray.join(',')


                    pool.query(
                    `INSERT INTO public.tenant_phone (tenant_id, phone)
                    VALUES ${phonesString}`, [], (err=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                error: `Error adding Tenant phones: ${err}`
                            })
                        }
                    })
                    )

                    //INSERT EMAILS
                    var emailsArray =[]
                    emails.map(email=>{
                        emailsArray.push(`(${id}, '${email}')`)
                    });

                    const emailsString = emailsArray.join(',')
                    console.log(emailsString)
                    pool.query(
                    `INSERT INTO public.tenant_email (tenant_id, email)
                    VALUES ${emailsString}`, [], (err=>{
                        if(err){
                            console.log(err);
                            return res.status(500).json({
                                error: `Error adding Tenant emails: ${err}`
                            })
                        }
                    })
                    )
                    res.status(200).json({
                        message: "Tenant Added!"
                    })
                }
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Appliance!", 
        });
    }
}

exports.editTenant = async(req, res)=>{
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

exports.deleteTenant = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {
        const data = await pool.query(`DELETE FROM public.tenants WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting tenant: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Tenant DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting tenants!", //Database connection error
        });
    }
}

