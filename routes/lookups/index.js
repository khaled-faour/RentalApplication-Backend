const express = require('express');
const app = express();

const regions = require('./regions');
const cities = require('./cities');
const states = require('./states');
const fees = require('./fees');
const propertyTypes = require('./propetyTypes');
const cycles = require('./cycles');
const leaseTypes = require('./leaseTypes');
const paymentTypes = require('./paymentTypes');
const appliances = require('./appliances');
const roles = require('./roles');
const identificationTypes = require('./identificationTypes');


app.use('/regions', regions);
app.use('/appliances', appliances)
app.use('/cities', cities);
app.use('/states', states);
app.use('/fees', fees);
app.use('/propertyTypes', propertyTypes);
app.use('/cycles', cycles);
app.use('/leaseTypes', leaseTypes);
app.use('/paymentTypes', paymentTypes);
app.use('/roles', roles);
app.use('/identificationTypes', identificationTypes);



module.exports = app;
