const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')






//Validation
var regType01 = /^[A-Za-z]{2,}$/  // for college abbriviation name
var regType02 = /^[A-Za-z ,]{3,}$/ // for full name
var regType03 = /^[6-9]{1}[0-9]{9,}$/ // for phone Number
var regType04 = /^[A-Za-z0-9._]{1,}@[A-Za-z]{1,}[.]{1}[A-Za-z.]{2,}$/ // For Email

const interns = async function (req, res) {
    try {
        let data = req.body
        console.log(data.collegeId)
        console.log(data.name)
        console.log(data.email)
        console.log(data.number)
        // let drumId = await CollegeModel.findOne({collegeId: data.collegeId}).select({_id:1})
        // console.log(drumId)
        if (data.name = undefined || data.email == undefined || data.number == undefined) {
             return res.status(404).send({ status: "false", message: "Please fill Mandatory fields" })
        }
        else if (!regType04.test(data.email)) {
             res.status(400).send({ msg: "Email is not valid" })
        }
        else if (!regType03.test(data.number)) {
            res.status(400).send({ status: "false", message: "Please enter a valid contact number" })
        }
        else if (!regType02.test(data.name)) {
            res.status(400).send({ status: "false", message: "Please enter a valid name" })
        }
        // else if (drumId._id != data.collegeId) {
        //     res.status(400).send({ status: "false", message: "the College Id does not exist" })
        // }
        else{
        let createIntern = await InternModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
        }
    }
    catch {
        res.status(400).send({ status: false, message: "Error" })
    }
}