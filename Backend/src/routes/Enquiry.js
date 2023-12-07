const express = require("express");
const router = express.Router();
const newEnquiry = require("../models/EnquiryModel");

// GET route - Retrieve all enquiries
router.get("/", async (req, res) => {
  try {
    const enquiries = await newEnquiry.find();
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route - Create a new enquiry
router.post("/", async (req, res) => {
  const enquiry = new newEnquiry(req.body);

  try {
    const newEnquiryRecord = await enquiry.save();
    res.status(201).json(newEnquiryRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
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

module.exports = router;
