const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'Client name is required']
  },
  clientEmail: {
    type: String,
    required: [true, 'Client email is required'],
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  clientPhone: {
    type: Number,
    required: [true, 'Client phone number is required'],
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  clientAddress: {
    type: String,
    required: [true, 'Client address is required']
  },
  clientPanCard: {
    type: String,
    required: [true, 'Client PAN card is required'],
    validate: {
      validator: function(v) {
        return /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(v);
      },
      message: props => `${props.value} is not a valid PAN card number!`
    }
  },
  clientPassword: {
    type: String,
    required: [true, 'Client password is required'],
    minlength: [3, 'Password must be at least 3 characters long']
  }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
