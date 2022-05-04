const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const Email = require('mongoose-type-email')
// const ObjectId = mongoose.Schema.Types.ObjectId

const InternModel= new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: Email,
        require: true
    },
    mobile_number:{
        type: Number,
        require: true
    },
    collegeId:{
        type: ObjectId,
        ref: College,
        require: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{timestamps: true})

module.exports = mongoose.model("Intern", InternModel)