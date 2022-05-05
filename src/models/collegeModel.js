const res = require('express/lib/response')
const mongoose = require('mongoose')


const CollegeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    fullName: {
        type: String,
        required: "The full name of college is required",
        trim: true
    },
    logoLink:{
        type: String,
        required: "Put the link of college logo",
        trim: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports= mongoose.model("College", CollegeModel)

