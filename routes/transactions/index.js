const express = require('express');

const app = express();



const receipts = require("./receipts/receipts");
const payments = require("./payments/payments");
const transactions = require("./transactions");

app.use("/receipts", receipts);
app.use("/payments", payments);
app.use("/", transactions)



module.exports = app;
