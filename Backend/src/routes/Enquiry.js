const express = require("express");
const router = express.Router();
const newEnquiry = require("../models/EnquiryModel");
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



// GET route - Retrieve all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await newEnquiry.find();
    res.json(enquiries);
  } catch (error) {
    console.error("Error fetching enquiries:", error);

    // Handle different types of errors
    if (error.name === 'MongoError' && error.code === 18) {
      // Handle MongoDB validation error
      return res.status(400).json({ message: 'Invalid request' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST route - Create a new enquiry
router.post("/", async (req, res) => {
  const enquiry = new newEnquiry(req.body);

  try {
    const newEnquiryRecord = await enquiry.save();
    const responseData = await newEnquiry.findById(newEnquiryRecord._id);
    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// POST route to add a new enquiry
router.post("/addEnquiry", async (req, res) => {
  const {
    Pan_Card,
    Adhar_Card,
    Cancelled_cheque,
    uploaded_image,
    name,

    mobile_nu,
    Alternative_Mobile,
    Mother_Name,
    Email,
    Last_Education,
    Married_Status,
    Nominee_Name,
    Nominee_DOB,
    Nominee_Ralationship,
    Company_Name,
    Annual_Income,
    Industry_Name,
    Height,
    Weight,
    Life_Cover,
    medical_History,
    Employeement_Status,
    Enquiry_Date,
    filename,
    path,
    serviceImage,
    Executive_Id,
    Enquiry_Status
  } = req.body;

  try {
    // Create a new enquiry instance
    const newEnquiry = new newEnquiry({
      Pan_Card,
      Adhar_Card,
      Cancelled_cheque,
      uploaded_image,
      name,

      mobile_nu,
      Alternative_Mobile,
      Mother_Name,
      Email,
      Last_Education,
      Married_Status,
      Nominee_Name,
      Nominee_DOB,
      Nominee_Ralationship,
      Company_Name,
      Annual_Income,
      Industry_Name,
      Height,
      Weight,
      Life_Cover,
      medical_History,
      Employeement_Status,
      Enquiry_Date,
      filename,
      path,
      serviceImage,
      Executive_Id,
      Enquiry_Status
    });

    // Save the new enquiry to the database
    const savedEnquiry = await newEnquiry.save();

    // Respond with the saved enquiry
    res.status(201).json(savedEnquiry);
  } catch (error) {
    console.error("Error creating enquiry:", error);

    // Handle different types of errors
    if (error.name === 'ValidationError') {
      // Handle Mongoose validation error
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST route - Create a new enquiry
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const publicUrl = `http://localhost:4000/public/uploads/${req.file.originalname}`;

      const imageData = new newEnquiry({
        filename: req.file.originalname,
        path: req.file.path, // This is the local path on your server
        serviceImage: publicUrl,
      });

      await imageData.save();
      res.status(201).json(imageData);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (e) {
    console.error('Error in image upload:', e);
    res.status(500).json({ message: "Internal server error" });
  }
});





// PATCH route - Update an enquiry's information
router.patch("/:id", async (req, res) => {
  try {
    const updatedEnquiry = await newEnquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route - Delete an enquiry
router.delete("/:id", async (req, res) => {
  try {
    const deletedEnquiry = await newEnquiry.findByIdAndDelete(req.params.id);
    res.json(deletedEnquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", async (req, res) => {
  const enquiryId = req.params.id;

  try {
    const enquiry = await newEnquiry.findById(enquiryId);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error) {
    console.error("Error fetching enquiry by ID:", error);

    // Handle different types of errors
    if (error.name === 'CastError') {
      // Handle invalid ID format
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/executive/:executiveId", async (req, res) => {
  try {

    const executiveId = req.params.executiveId
    const data = await newEnquiry.find({ Executive_Id: executiveId})
    if(!data){
      return res.status(404).json({message : "Data not found by this Id"})
    }
    res.status(201).json(data)
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
  }
})

module.exports = router;
