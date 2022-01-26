const pool= require("../../configs/database");

exports.totalTenants = (req,res)=>{
    pool.query('SELECT COUNT(tenants) FROM tenants', (err,result)=>{
        res.status(200).json(result.rows[0])
    })
}