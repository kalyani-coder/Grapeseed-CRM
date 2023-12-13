

const mongoose = require('mongoose')

const EnquirySchema = new mongoose.Schema({
  filename: String,
  path: String,
  serviceImage: String,

  // Pan_Card: {
  //   type: String,
  //   // Pan_Image : String,
    
  // },
  // Adhar_Card: {
  //   type: String,
  //   Adhar_Image : String,
    
  // },
  // Cancelled_cheque: {
  //   type: String,
  //   CancledCheck_Image: String,
    
  // },
  // Nominee_DOB: {
  //   type: String,
  //   Nominee_Id_Image : String
 
  // },
  // name: {
  //   type: String,
   
  // },
  // mobile_nu: {

  //   type: String,
   
  // },
  // Alternative_Mobile: {
  //   type: String,
  // },
  // Mother_Name: {
  //   type: String,
 

  // },
  // Email: {
  //   type: String,
    
  // },
  // Last_Education: {
  //   type: String,
  
  // },
  // Married_Status: {
  //   type: String,
  
  // },
  // Nominee_Name: {
  //   type: String,
    
  // },
  // Nominee_Ralationship: 
  // {
  //   type: String,
   
  // },
  // Company_Name: {
  //   type: String,
    
  // },
  // Annual_Income: {
  //     type: String,
   
  // },
  // Industry_Name: {
  //   type: String,
   
  // },
  // Height: {
  //   type: String,
     
  // },
  // Weight: {
  //   type: String,
   
  // },
  // Life_Cover: {
  //   type: String,
    
  // },
  // medical_History: {
  //   type: String,
   
  // },
  // Employeement_Status: {
  //   type: String,
  
  // },

  // Enquiry_Date: {
  //   type: Date,
    
  // },
 
 

  // Executive_Id : {
  //   type : String
  // },

  // Enquiry_Status :{
  //   type : String
  // },
  // Work_Designation : {
  //   type : String
  // },


})

const newEnquiry = mongoose.model('Enquiry', EnquirySchema)

module.exports = newEnquiry