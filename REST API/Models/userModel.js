const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    first_name :{
        type:String,
        required:[true,"Please Enter name!"]
    },
    last_name :{
        type:String,
        
    },
    email :{
        type:String,
        required:true,
        unique:[true,"This email has already taken"]
    },
    gender:{
        type:String,
        
    },
    job_title:{
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)