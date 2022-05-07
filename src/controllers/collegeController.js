const CollegeModel = require('../models/collegeModel')

//Validation
var regType01 = /^[A-Za-z]{2,}$/  // for college abbriviation name
// var regType02 = /^[A-Za-z ,]{3,}$/

const colleges = async function (req, res) {
    try {
        let data = req.body

        //---------------validation and more-------------------
        if (!data.name) {
            return res.status(400).send({ status: false, message: "college Abbriviation name is mandatory" })
        }
        let abbNameFind = await CollegeModel.findOne({ name: data.name })
        if (abbNameFind) {
            return res.status(400).send({ status: false, message: "Douplicate college Abbriviation name, not Allowed!" })
        }
        if (!regType01.test(data.name)) {
            return res.status(400).send({ status: false, message: "A valid college Abbriviation name is needed" })
        }
        if (!data.fullName) {
            return res.status(400).send({ status: false, message: "College's full name is mandatory" })
        }
        if (!data.logoLink) {
            return res.status(400).send({ status: false, message: "logo link is mandatory" })
        }

        // ------------------creating Data------------------
        let createCollege = await CollegeModel.create(data)
        res.status(201).send({ Status: true, data: createCollege })

    }
    catch (err) {
        res.status(400).send({ status: false, Error: err.message })
    }
}

module.exports.colleges = colleges