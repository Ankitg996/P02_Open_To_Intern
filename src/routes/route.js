const express = require('express')
const router = express.Router()

const CollegeController = require('../controllers/collegeController')
const InternController= require('../controllers/internController')

router.post('/functionup/colleges',CollegeController.colleges)
router.post('/functionup/interns', InternController.interns)

module.exports = router