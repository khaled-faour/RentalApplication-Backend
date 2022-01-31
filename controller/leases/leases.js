const { Client } = require("pg");
const pool= require("../../configs/database");

exports.getLeases = async(req, res)=>{

    try {
        const data = await pool.query(
            `SELECT 
                lease.id AS id,
                lease_from_date,
                lease_to_date,
                tenant AS tenant_id,
                unit,
                CONCAT(INITCAP(tenant.first_name), ' ', INITCAP(tenant.last_name)) AS tenant,
                tenant.id AS tenant_id,
                unit.code AS unit_code,
                lease_type.description AS type,
                property.code AS property_code,
                project.project_name AS project_name,
                project.id AS project_id
            FROM 
                public.leases AS lease
            JOIN public.tenants AS tenant ON lease.tenant = tenant.id
            JOIN public.units AS unit ON lease.unit = unit.id
            JOIN public.lease_types AS lease_type ON lease_type.id = lease.lease_type
            JOIN public.properties AS property ON property.id = unit.property_id
            JOIN public.projects AS project ON property.project_id = project.id`);
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

exports.getLeaseById = async(req, res) => {
    const {tenant_id} = req.query
    try {
        const data = await pool.query(
            `SELECT DISTINCT id, lease_type  FROM public.leases
             WHERE tenant = ${tenant_id}`);
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
            error: "Database error occurred while fetching Lease_fees!", //Database connection error
        });
    }
}


exports.addLease = async(req, res)=>{

    const {unit, tenant,  leaseType, from, to, fees, user } = req.body


    //Calculate Months Difference
    const monthsDiff = () =>{
    let months;
    d1 = new Date(from);
    d2 = new Date(to);
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months;
    }
        

    try{



        
        //ADD Lease Query
        const res = await pool.query( 
            `INSERT INTO public.leases (unit, tenant, lease_type, lease_from_date, lease_to_date, "user") 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [unit, tenant, leaseType, from, to, user],
        async (err, result)=>{
            if(err) throw err


            //SET Unit Occupied
            pool.query(`UPDATE public.units SET occupancy_status = ${true} WHERE id = ${unit}`,
            (err)=>{
                if(err) throw err
            })
            
           
            //Add Lease fees
            fees.map(async fee=>{
                //Fetch Cycle
                const cycle = await pool.query(`SELECT months FROM public.cycles WHERE id = ${fee.cycle}`)
                console.log("cycle: ", cycle)
                for(let i=0; i<(monthsDiff()/(cycle.rows[0].months)); i++){
                    pool.query(
                        `INSERT INTO
                        public.lease_fees (lease_id, fee_id, cycle, price)
                        VALUES (${result.rows[0].id}, ${fee.fee_id}, ${fee.cycle}, ${fee.price})`, (err, result)=>{
                            if(err) throw err;
                        })
                }
            })

        })


    } catch (e){
        try {
            pool.query('ROLLBACK');
        } catch (rollbackError) {
            console.log("Rollback Error: ", rollbackError)
        }
        console.log("An Error Occured: ", e);
        return e;
    }finally{
        res.status(200).send("Success")
    }
    // try {
    //         const data = await pool.query(
    //             `INSERT INTO public.projects (number, project_name,  region, country, city, street)
    //             VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    //             [number, name,  region, country, city, street], (err, result)=>{
    //                 if(err){
    //                     res.status(500).json({
    //                         error: `Error adding project: ${err}`
    //                     })
    //                 }else{
    //                     res.status(200).json({
    //                         message: "Project Added!"
    //                     })
    //                 }
    //         });
        
    // } catch (error) {
    //     console.log('Error:', error);
    //     res.status(500).json({
    //         error: "Database error occurred while adding Project!", 
    //     });
    // }
}

exports.editLease = async(req, res)=>{
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

exports.deleteLease = async(req, res)=>{
    const {id} = req.body
    console.log("ID: ",id)
    try {
        const data = await pool.query(`DELETE FROM public.projects WHERE id = $1 RETURNING *`, [id], (err, result)=>{
            if(err){
                res.status(500).json({
                    error: `Error deleting project: ${err}`
                })
            }else{
                res.status(200).json({
                    message: "Project DELETED!"
                })
            }
        });
       
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while deleting projects!", //Database connection error
        });
    }
}

