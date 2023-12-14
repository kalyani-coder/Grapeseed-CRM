

const mongoose = require('mongoose')

const EnquirySchema = new mongoose.Schema({
  filename: String,
  path: String,
  serviceImage: String,

 


})

const newEnquiry = mongoose.model('Enquiry', EnquirySchema)

module.exports = newEnquiry