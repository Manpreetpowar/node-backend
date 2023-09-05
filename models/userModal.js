const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
        name:{
            type: String,
            required:true,
        },
        email:{
            type: String,
            required:true,
            unique:true,
        },
        age:{
            type: String,
            required:true,
        },
        mobile:{
            type: Number,
            required:true,
        },
        work:{
            type: String,
            required:true,
        },
        address:{
            type: String,
            required:true,
        },
        description:{
            type: String,
            required:true,
        }
});

module.exports = mongoose.model("users", userSchema);