const express = require("express");
const router = express.Router();
const Client = require("../models/ExecutiveLoginModel"); // Adjust the path as needed
const bcrypt = require('bcrypt')
// Page: Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await Client.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// POST route to add a new client
router.post('/', async (req, res) => {
  try {
    // Decrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.clientPassword, salt);

    // Create a new client object
    const client = new Client({
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      clientPhone: req.body.clientPhone,
      clientAddress: req.body.clientAddress,
      clientPanCard: req.body.clientPanCard,
      clientPassword: hashedPassword
    });

    // Save the client to the database
    await client.save();
    res.status(201).send({ message: 'Client created successfully', client });

  } catch (error) {
    // If validation errors occur, respond with the error messages
    if (error.name === 'ValidationError') {
      let messages = {};
      for (field in error.errors) {
        messages[field] = error.errors[field].message;
      }
      return res.status(400).send({ message: 'Validation failed', errors: messages });
    }

    // Handle other potential errors
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});


// router.get("/login", async (req, res) => {
//   const { ident, password } = req.body;
//   const client = await Client.findOne({
//     $or: [{ clientEmail: ident, clientPhone: ident }],
//   });

//   if (!client) {
//     res
//       .status(400)
//       .json({ message: "Email or Phone not found", verified: false });
//   }

//   const isMatch = await client.comparePassword(password);

//   if (!isMatch) {
//     return res
//       .status(400)
//       .json({ message: "Invalid password", verified: false });
//   }

//   res.status(200).json({ message: "Valid password", verified: false });
// });

// Page: Create a new client
// router.post("/", async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     await newClient.save();
//     res.status(201).json(newClient);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Page: Update a client by ID
// router.patch("/:id", async (req, res) => {
//   const clientId = req.params.id;
//   try {
//     const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {
//       new: true,
//     });
//     res.json(updatedClient);
//   } catch (error) {
//     res.status(404).json({ message: "Client not found" });
//   }
// });

// // Page: Delete a client by ID
// router.delete("/:id", async (req, res) => {
//   const clientId = req.params.id;
//   try {
//     const deletedClient = await Client.findByIdAndDelete(clientId);

//     if (!deletedClient) {
//       return res.status(404).json({ message: "Client not found" });
//     }

//     res.json({ message: "Client deleted successfully", deletedClient });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });


// get by id
module.exports = router;
