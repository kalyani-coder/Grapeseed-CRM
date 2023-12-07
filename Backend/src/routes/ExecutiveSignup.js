const express = require("express");
const router = express.Router();
const newExecutiveSchema = require("../models/ExecutiveSignupModel"); // Adjust the path as needed

// GET route - Retrieve all executive data
router.get("/", async (req, res) => {
  try {
    const executives = await newExecutiveSchema.find();
    res.json(executives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/", async (req, res) => {
  const executive = new newExecutiveSchema({
    // Extract data from the request body
    email: req.body.email,
    password: req.body.password,
    // Add other properties as needed
  });

  try {
    const newExecutive = await executive.save();
    res.status(201).json(newExecutive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const updatedExecutive = await newExecutiveSchema.findByIdAndUpdate(
      req.params.id,
      {
        // Update specific properties based on your needs
        username: req.body.username,
        password: req.body.password,
        // Add other properties as needed
      },
      { new: true }
    );
    res.json(updatedExecutive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedExecutive = await newExecutiveSchema.findByIdAndDelete(req.params.id);
    res.json(deletedExecutive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
