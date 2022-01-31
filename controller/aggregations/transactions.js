const pool= require("../../configs/database");

exports.totalTransactions = (req,res)=>{
    pool.query('SELECT COUNT(transactions) FROM transactions', (err,result)=>{
        res.status(200).json(result.rows[0]);
    })
}

exports.totalReceipts = (req,res)=>{
    pool.query('SELECT COUNT(transactions) FROM transactions WHERE type=$1',['receipt'], (err,result)=>{
        res.status(200).json(result.rows[0]);
    })
}

exports.totalPayments = (req,res)=>{
    pool.query('SELECT COUNT(transactions) FROM transactions WHERE type=$1',['payment'], (err,result)=>{
        res.status(200).json(result.rows[0]);
    })
}

exports.recentTransactions = (req,res)=>{
    pool.query('SELECT * FROM all_transactions ORDER BY payment_date DESC LIMIT 5', (err,result)=>{
        res.status(200).json(result.rows);
    })
}
