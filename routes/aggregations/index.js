const express = require('express');
const app = express();

const units = require('./units');
const tenants = require('./tenants');
const transactions = require('./transactions');



app.use('/units', units);
app.use('/tenants', tenants);
app.use('/transactions', transactions);



module.exports = app;
