const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')


const interns = async function (req, res) {
    try {
        let data = req.body
        console.log(data)
        let createIntern = await InternModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
    }
    catch {
        res.status(400).send({ status: false, message: "Bad Request, Invalid Credential" })
    }
}

const getData = async function (req, res) {
    try {
        let data = req.query.name;

        let coId = await CollegeModel.find({ name: data }).select({ _id: 1, name: 1, fullName: 1, logoLink: 1 })
        console.log(coId)

        if (coId.length == 0) { res.status(404).send({ status: false, data: "No such College Name found" }) }

        let intern = await InternModel.find({ collegeId: coId }).select({ _id: 1, name: 1, email: 1, moblie_number: 1 })
        console.log(intern)
        let interest = [];
        interest = interest.concat(intern)
        res.send({ data: coId, interest })
    }
    catch {
        res.status(400).send({ status: false, message: "Bad Request!" })
    }
}


module.exports.interns = interns
module.exports.getData = getData