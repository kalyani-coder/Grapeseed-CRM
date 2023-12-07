

// database password 
// M9e09IV5RxLDA9uu


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 4000

// middlewares 
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb+srv://vedantassignment05:M9e09IV5RxLDA9uu@executive.h2o5uvn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
});




const apiRouter = express.Router();

//   handle route 
const login = require('./src/routes/ExecutiveLogin')
const enquiry = require('./src/routes/Enquiry')

// handle api path 

apiRouter.use('/clients', login)
apiRouter.use('/enquiry', enquiry)


app.use('/api', apiRouter)



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
.on('error', (error) => {
    console.error('Server start error:', error);
});