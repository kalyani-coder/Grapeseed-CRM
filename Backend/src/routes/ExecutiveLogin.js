const express = require("express");
const router = express.Router();
const Client = require("../models/ExecutiveLoginModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'grapseeds';

// Page: Get all clients

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get route for all value 
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

// Register Client POST route to add a new client
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

// Login Route for the Clients 
// router.post('/login', async (req, res) => {
//   try {
//     const { clientEmail, clientPassword } = req.body;

//     // Find the client by email
//     const client = await Client.findOne({ clientEmail });
//     if (!client) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     // Check if the password matches
//     const isMatch = await bcrypt.compare(clientPassword, client.clientPassword);
//     if (!isMatch) {
//       return res.status(400).send({ message: 'Invalid email or password' });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ id: client._id }, jwtSecret, );

//     // Respond with the token and client ID
//     res.status(200).send({ token, id: client._id, email: client.clientEmail });

//   } catch (error) {
//     res.status(500).send({ message: 'Server error', error: error.message });
//   }
// });


router.post('/login', async (req, res) => {
  try {
    const { clientEmail, clientPassword } = req.body;

    // Find the client by email
    const client = await Client.findOne({ clientEmail });
    if (!client) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(clientPassword, client.clientPassword);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Create a JWT token
    const token = jwt.sign({ id: client._id }, jwtSecret, { expiresIn: '1h' });

    // Respond with the token and client details
    res.status(200).send({ token, client: { id: client._id, email: client.clientEmail } });

  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});




// Delete route 
router.delete("/:id" , async(req, res) =>{
  try{
    const id = req.params.id
    const deletedClients = await Client.findByIdAndDelete(id)
    if(!deletedClients){
      return res.status(404).json({message : "Internla server error"})
    }
    res.status(201).json({message : "Client Deleted Successfully"})
  }catch(e){
    res.status(500).json({messsage : "Internla server error "})
  }
})

module.exports = router;
