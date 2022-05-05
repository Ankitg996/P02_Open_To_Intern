// const { ObjectId } = require('bson')
const mongoose = require('mongoose')
// const Email = require('mongoose-type-email')
const ObjectId = mongoose.Schema.Types.ObjectId


const InternModel= new mongoose.Schema({
    name:{
        type: String,
        required: true
        // trim: true
    },
    email:{
        type: String,
        required: true
        // trim: true
    },
    number:{
        type: String,
        required: true,
        unique: true
    },
    collegeId:{
        type: ObjectId,
        ref: "College",
        required: true
        // trim: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model("intern", InternModel)