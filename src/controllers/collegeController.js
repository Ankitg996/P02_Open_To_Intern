const CollegeModel = require('../models/collegeModel')


const colleges = async function(req, res){
    let data = req.body
    let createCollege = await CollegeModel.create(data)
    res.status(201).send({Status:true,data:createCollege})
}

module.exports.colleges= colleges