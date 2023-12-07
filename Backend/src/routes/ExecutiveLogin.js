const express = require("express");
const router = express.Router();
const Client = require("../models/ExecutiveLoginModel"); // Adjust the path as needed

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

router.get("/login", async (req, res) => {
  const { ident, password } = req.body;
  const client = await Client.findOne({
    $or: [{ clientEmail: ident, clientPhone: ident }],
  });

  if (!client) {
    res
      .status(400)
      .json({ message: "Email or Phone not found", verified: false });
  }

  const isMatch = await client.comparePassword(password);

  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "Invalid password", verified: false });
  }

  res.status(200).json({ message: "Valid password", verified: false });
});

// Page: Create a new client
router.post("/", async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Page: Update a client by ID
router.patch("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {
      new: true,
    });
    res.json(updatedClient);
  } catch (error) {
    res.status(404).json({ message: "Client not found" });
  }
});

// Page: Delete a client by ID
router.delete("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await Client.findByIdAndRemove(clientId);
    res.json(deletedClient);
  } catch (error) {
    res.status(404).json({ message: "Client not found" });
  }
});

// get by id

router.get("/:id", async (req, res) => {
  const clientId = req.params.id;

  try {
    const newClient = await Client.findById(clientId);
    if (!newClient) {
      return res.status(404).json({ message: "Client not Found" });
    }
    res.json(newClient);
  } catch (e) {
    res
      .status(404)
      .json({ message: "Client by id not found Internal server error" });
  }
});

module.exports = router;
