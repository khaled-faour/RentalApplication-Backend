const pool= require("../../configs/database");


exports.getCheckInOut = async (req, res) => {
    //const {lease_id} = req.query
    console.log("OIOPPKJKMJNJKJh")
    try {
        const data = await pool.query(
            `SELECT check_in_out.id as id,
                    check_in_out.lease,
                    status,
                    start_date,
                    tenant.name AS tenant,
                    end_date,
                    notes,
                    appliances,
                    "checkOut_date",
                    "checkOut_appliances"
                    FROM check_in_out
                    JOIN tenants AS tenant ON check_in_out.tenant = tenant.id
                    JOIN leases on check_in_out.lease = leases.id`);
                    
        const rows = data.rows;
        if(rows.length === 0){
            res.json({
                message: 'no data'
            })
        }else{
            console.log(rows)
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while fetching Appliances!", //Database connection error
        });
    }
}

exports.addCheckIn = async(req, res)=>{
    const {tenant, lease, start_date, end_date, status, notes, user, appliances} = req.body || null;
    console.log(req.body);
    console.log(Date.parse(start_date)/1000,)
    let start_date1 = new Date(start_date)
    let end_date1 = new Date(end_date)
  try {
            pool.query(
                `CALL public."add_check_in"($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    tenant,
                    notes, 
                    lease, 
                    start_date1, 
                    end_date1, 
                    status,
                    user,
                    appliances
                ], (err, result)=>{
                if(err){
                    throw err;
                }else{
                    return res.status(200).json({
                        message: `Success`,
                        result
                    });
                }
            });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Appliance!", 
        });
    }
}

exports.checkOut = async(req, res)=>{
    console.log(req.body)
    let {appliances, checkout_date, id} = req.body || null;
    console.log(appliances)
    let checkout_date1 = new Date(checkout_date)
  try {
    const data = await pool.query(`UPDATE public."check_in_out" SET "checkOut_date" = $2, "checkOut_appliances" = $3, status='Check Out' WHERE public."check_in_out".id = $1`, [id, checkout_date1, appliances], (err, result)=>{
  
    console.log(err)
    if(err){
        throw err;
    }else{
        return res.status(200).json({
            message: `Success`,
            result
        });
    }
        /*         pool.query(
                `CALL public."CheckOut"($1, $2, $3)`,
                [
                    id,
                    checkout_date, 
                    appliances, 
                ], (err, result)=>{
                if(err){
                    throw err;
                }else{
                    return res.status(200).json({
                        message: `Success`,
                        result
                    });
                }*/
            });
        
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Appliance!", 
        });
    }
}

exports.saveEditCheckIn = async(req, res)=>{
   // const {tenant, lease, start_date, end_date, status, notes, user, appliances} = req.body || null;
   console.log("KKKKKK")
   console.log(req.body);
  /*  console.log(Date.parse(start_date)/1000,)
    let start_date1 = new Date(start_date)
    let end_date1 = new Date(end_date)
  try {
            pool.query(
                `CALL public."add_check_in"($1, $2, $3, $4, $5, $6, $7, $8)`,
                [
                    tenant,
                    notes, 
                    lease, 
                    start_date1, 
                    end_date1, 
                    status,
                    user,
                    appliances
                ], (err, result)=>{
                if(err){
                    throw err;
                }else{
                    return res.status(200).json({
                        message: `Success`,
                        result
                    });
                }
            });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            error: "Database error occurred while adding Appliance!", 
        });
    }*/
}