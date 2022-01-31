const pool= require("../../configs/database");

exports.totalUnits = (req,res)=>{
    pool.query('SELECT COUNT(units) FROM units', (err,result)=>{
        res.status(200).json(result.rows[0])
    })
}

exports.vacantUnits = (req,res)=>{
    pool.query('SELECT COUNT(units) FROM units WHERE occupancy_status=$1',[false], (err,result)=>{
        res.status(200).json(result.rows[0])
    })
}