const CollegeModel = require('../models/collegeModel')

//Validation
var regType01 = /^[A-Za-z]{2,}$/  // for college abbriviation name

const colleges = async function (req, res) {
    try {
        let data = req.body
        let createCollege = await CollegeModel.create(data)
        res.status(201).send({ Status: true, data: createCollege })
    }
    catch {
        res.status(400).send({ status: false, data: "bad request" })
    }
}

module.exports.colleges = colleges