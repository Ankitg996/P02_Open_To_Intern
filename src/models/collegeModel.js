const res = require('express/lib/response')
const mongoose = require('mongoose')


const CollegeModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    fullName: {
        type: String,
        required: true
    },

    logoLink:{
        type: String,
        required: true
    },

    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports= mongoose.model("College", CollegeModel)

