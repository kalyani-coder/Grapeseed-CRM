const mongoose = require('mongoose')

const EnquirySchema = new mongoose.Schema({

  Pan_Card: {
    type: String,
    // required : true
  },
  Adhar_Card: {
    type: String,
    // required : true
  },
  Cancelled_cheque: {
    type: String,
    // required : true 
  },
  
  name: {
    type: String,
    // required :true
  },
  mobile_nu: {

    type: String,
    // required : true 
  },
  Alternative_Mobile: {
    type: String,
    // required : true 
  },
  Mother_Name: {
    type: String,
    // required : true

  },
  Email: {
    type: String,
    // required : true 
  },
  Last_Education: {
    type: String,
    // required : true 
  },
  Married_Status: {
    type: String,
    // required : true
  },
  Nominee_Name: {
    type: String,
    //  required : true 
  },
  Nominee_DOB: {
    type: String,
    //  required : true 
  },
  Nominee_Ralationship: {
    type: String,
    // required  : true
  },
  Company_Name: {
    type: String,
    // required : true
  },
  Annual_Income: {
    type: String,
    // required : true  
  },
  Industry_Name: {
    type: String,
    // reqauired : true
  },
  Height: {
    type: String,
    // required : true 
  },
  Weight: {
    type: String,
    // required : true 
  },
  Life_Cover: {
    type: String,
    // required : true 
  },
  medical_History: {
    type: String,
    // required : true
  },
  Employeement_Status: {
    type: String,
    // required  : true
  },

  Enquiry_Date: {
    type: Date,
    // required : true
  },
  filename: String,
  path: String,
  serviceImage: String,
  Executive_Id: {
    type: String
  },
  Executive_Name : {
    type : String
  },

  Enquiry_Status: {
    type: String
  }

})

const newEnquiry = mongoose.model('Enquiry', EnquirySchema)

module.exports = newEnquiry