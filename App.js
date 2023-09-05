require("dotenv").config();
const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const connectDb = require("./config/dbConnection");
const users = require('./models/userModal');
const cors = require("cors");

connectDb();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/users', require('./routes/userRoute'));
app.listen(port, ()=>{
    console.log(`server is start port number ${port}`);
});