const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')

//Validation

var regType02 = /^[A-Za-z ]{2,}$/ // for full name
var regType03 = /^[6-9]{1}[0-9]{9,}$/ // for phone Number
var regType04 = /^[A-Za-z0-9._]{1,}@[A-Za-z]{1,}[.]{1}[A-Za-z.]{2,}$/ // For Email

const interns = async function (req, res) {
    try {
        let data = req.body
        let ci = await CollegeModel.findOne({ collegeId: data.collegeId }).select({ _id: 1 })
        console.log(ci)
        let cin = await InternModel.findOne({ number: data.number }).select({number:1})


        if (!data.email || !regType04.test(data.email)) {
            res.status(400).send({ status: false, message: "A valid email is needed" })
        }
        else if (!data.number || !regType03.test(data.number)|| data.number==cin) {
            res.status(400).send({ status: false, message: "Valid number is needed" })
        }
        else if (!data.name || !regType02.test(data.name)) {
            res.status(400).send({ status: false, message: "A valid name is needed" })
        }
        else if (!data.collegeId || ci.length==0) {
            res.status(400).send({ status: false, message: "Valid college ID is needed" })
        }
        
        else{
        let createIntern = await InternModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
        }

    }
    catch {
        res.status(400).send({ status: false, message: "Error aa gya" })
    }
}

const getData = async function (req, res) {
    try {
        let data = req.query.name;

        let coId = await CollegeModel.findOne({ name: data })
        console.log(coId)
        if (coId.length == 0) { res.status(404).send({ status: false, message: "No such College Name found" }) }

        let coId01 = await CollegeModel.findOne({ name: data }).select({ _id: 0, name: 1, fullName: 1, logoLink: 1 })

        let intern = await InternModel.find({ collegeId: coId }).select({ _id: 1, name: 1, email: 1, number: 1 })
        console.log(intern)
        let interest = [];
        interest = interest.concat(intern)
        res.send({ data: coId01, interest })
    }
    catch {
        res.status(400).send({ status: false, message: "Bad Request!" })
    }
}


module.exports.interns = interns
module.exports.getData = getData