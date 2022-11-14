const express = require("express"); 
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const CRouter = require('./router/company_router');

const app = express();





mongoose 
 .connect("mongodb://localhost:27017/company", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
         })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

 app.use(cors());
app.use(bodyParser.json());
app.use('/', CRouter);

app.listen(3001, () => {
    console.log("Server is Start ");
})


