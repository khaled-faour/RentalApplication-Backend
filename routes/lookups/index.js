const express = require('express');
const app = express();

const regions = require('./regions');
const countries = require('./countries');
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
const currencies = require('./currency')
const exchanges = require('./exchange')


app.use('/regions', regions);

app.use('/appliances', appliances);

app.use('/countries', countries);

app.use('/cities', cities);
app.use('/appliances', appliances)
app.use('/states', states);
app.use('/fees', fees);
app.use('/propertyTypes', propertyTypes);
app.use('/cycles', cycles);
app.use('/leaseTypes', leaseTypes);
app.use('/paymentTypes', paymentTypes);
app.use('/roles', roles);
app.use('/identificationTypes', identificationTypes);
app.use('/currencies', currencies);
app.use('/exchanges', exchanges);


module.exports = app;
