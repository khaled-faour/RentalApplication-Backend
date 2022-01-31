const express  =  require("express");
const cors = require('cors')
const jwt = require("jsonwebtoken")
const cookieParser = require('cookie-parser')
require('dotenv').config()
require("./configs/dotenv");

const pool = require('./configs/database')

const  user  =  require("./routes/users");
const test = require("./routes/test");
const lookups = require("./routes/lookups");
const tenants = require("./routes/tenants/tenants");
const tenantLeases = require("./routes/tenants/leases");
const tenantTransactions = require("./routes/tenants/transactions");
const projects = require("./routes/projects/projects");
const properties = require("./routes/properties/properties");
const units = require("./routes/units/units");
const users = require("./routes/users/users");
const unitFees = require("./routes/units/unit_fees");
const unitAppliances = require("./routes/units/unit_appliances");
const lease = require("./routes/leases/leases");
const draftLease = require("./routes/leases/draft_leases");
const activateLease = require("./routes/leases/activate");
const leaseFees = require("./routes/leases/lease_fees");
const receipts = require("./routes/receipts/receipts");
const payments = require("./routes/payments/payments");
const aggregations = require("./routes/aggregations/index");

const app = express(); //Initialized express

app.use(cookieParser())
app.use(express.json());

var corsOptions = {
    origin: 'http://localhost:3000'
}

app.use(cors(corsOptions));

const port = process.env.PORT || 3001;

app.get("/api", (req, res) => {
    console.log(req.headers)
    res.status(200).send("Engine Started, Ready to take off!");
})

app.post("/api/validate-token", (req, res)=>{
    const token = req.cookies.auth;
    console.log("token: ", token)
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_KEY);
      res.sendStatus(200);
    } catch(e) {
        console.log("ERROR: ", e)
      return res.sendStatus(403);
    }
})

app.use("/api/user",  user);  //Route for /user endpoint of API
app.use("/api/test", test);
app.use("/api/lookups", lookups);
app.use("/api/tenants", tenants);
app.use("/api/tenant/leases", tenantLeases);
app.use("/api/tenant/transactions", tenantTransactions);
app.use("/api/projects", projects);
app.use("/api/properties", properties);
app.use("/api/units", units);
app.use("/api/unit_fees", unitFees);
app.use("/api/unit_fees", unitAppliances);
app.use("/api/users", users);
app.use("/api/lease", lease);
app.use("/api/leases/draft_leases", draftLease);
app.use("/api/leases/activate", activateLease);
app.use("/api/leases/lease_fees", leaseFees);
app.use("/api/receipts", receipts);
app.use("/api/payments", payments);
app.use("/api/aggregations", aggregations);



app.listen(port, (err) => {
    if(err){
        console.log("Error setup server: ", err)
    }
    else{
        console.log(`Here we go, Engines started at ${port}.`);
    }
})




pool.connect((err) => { 

    //Connected Database
    if (err) {
        console.log(err);
    }else {
        console.log("Data logging initiated!");
    }
});