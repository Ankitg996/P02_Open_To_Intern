const InternModel = require('../models/internModel')

const interns = async function (req, res) {
    try {
        data = req.body
        createIntern = await InternModel.create(data)
        res.status(201).send({ status: true, data: createIntern })
    }
    catch {
        res.status(400).send({ status: false, message: "Bad Request, Invalid Credential" })
    }
}
module.exports.interns = interns
