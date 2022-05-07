let one = async function(req, res){
try {
    let data = req.query.collegeName;

    let coId = await CollegeModel.findOne({ name: data })
    if (coId.length == 0) { res.status(404).send({ status: false, message: "No such College Name found" }) }

    let coId01 = await CollegeModel.findOne({ name: data }).select({ _id: 0, name: 1, fullName: 1, logoLink: 1 })

    let intern = await InternModel.find({ collegeId: coId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
    console.log(intern)
    let interest = [];
    interest = interest.concat(intern)
    res.send({ data: coId01, interest })
}
catch {
    res.status(400).send({ status: false, message: "Bad Request!" })
}
}