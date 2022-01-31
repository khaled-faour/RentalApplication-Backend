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
                    CONCAT(INITCAP(tenant.first_name), ' ', INITCAP(tenant.last_name)) AS tenant,
                    end_date
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