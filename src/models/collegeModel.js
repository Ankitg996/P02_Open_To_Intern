const mongoose = require('mongoose')

const CollegeModel = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    fullName: {
        type: String,
        require: true,
    },
    logoLink:{
        require: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports= mongoose.model("College", CollegeModel)

