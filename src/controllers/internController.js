const InternModel = require('../models/internModel')
const CollegeModel = require('../models/collegeModel')
const collegeModel = require('../models/collegeModel')

//Validation
var regType01 = /^[A-Za-z]{2,}$/ // for college abbrivation
var regType02 = /^[A-Za-z ]{2,}$/ // for full name
var regType03 = /^[6-9]{1}[0-9]{9}$/ // for phone Number
var regType04 = /^[A-Za-z0-9._]{1,}@[A-Za-z]{1,}[.]{1}[A-Za-z.]{2,}$/ // For Email

const interns = async function (req, res) {
    try {
        let data = req.body

        //--------------------Applying Regex--------------------------
        if (!data.email || !regType04.test(data.email)) {
            return res.status(400).send({ status: false, message: "A valid email is needed" })
        }
        if (!data.mobile || !regType03.test(data.mobile)) {
            return res.status(400).send({ status: false, message: "A valid number is needed" })
        }
        if (!data.name || !regType02.test(data.name)) {
            return res.status(400).send({ status: false, message: "A valid name is needed" })
        }
        if (!data.collegeName || !regType02.test(data.collegeName)) {
            return res.status(400).send({ status: false, message: "A valid college Abbriviation name is needed" })
        }

        //-------------------Finding and Fetching Data----------------
        let ci = await CollegeModel.findOne({ name: data.collegeName })
        if (!ci) {
            return res.status(400).send({ Status: false, message: "The college does not exists" })
        }

        let uniqueCheck = await InternModel.findOne({ $or: [{ mobile: data.mobile }, { email: data.email }] })

        if (uniqueCheck) {
            if (data.mobile === uniqueCheck.mobile || data.email === uniqueCheck.email)
                return res.status(400).send({ Status: false, message: "The Data already exists" })
        }

        //----------------------Creating data---------------------------
        let createIntern = await InternModel.create(data)

        //-------------------Customizing Output------------------------
        let finalData = await InternModel.findOneAndUpdate({ email: data.email, mobile: data.mobile }, { collegeId: ci._id }, { new: true }).select({ name: 1, email: 1, mobile: 1, collegeId: 1, isDeleted: 1, _id: 0 })

        //---------------sending customized output-------------------
        return res.status(201).send({ status: true, data: finalData })
    }
    catch (err) {
        return res.status(400).send({ status: false, message: err.message })
    }
}

const getData = async function (req, res) {
    try {
        let data = req.query.collegeName;

        if (!data || !regType01.test(data)) {
            return res.status(400).send({ status: false, message: "querry params need a valid College Abbriviation Name" })
        }
        let ExistedCN = await collegeModel.findOne({ name: data })
        if (!ExistedCN) {
            return res.status(400).send({ status: false, message: "The college Name is not existed" })
        }

        let coId = await CollegeModel.findOne({ name: data })
        if (coId.length == 0) {
            return res.status(404).send({ status: false, message: "No such College Name found" })
        }

        let coId01 = await CollegeModel.findOne({
            name: data
        }).select({
            _id: 0, name: 1, fullName: 1, logoLink: 1
        })

        let intern = await InternModel.find({ collegeId: coId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
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