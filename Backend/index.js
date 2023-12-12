

// database password 
// M9e09IV5RxLDA9uu


const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
// const app = express()
const multer = require('multer');
const port = process.env.PORT || 4000

// middlewares 
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use('/public', express.static('public'));
app.use(cors());

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });


mongoose.connect('mongodb+srv://vedantassignment05:M9e09IV5RxLDA9uu@executive.h2o5uvn.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
//   useUnifiedTopology: true,
  
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});


// const apiRouter = express.Router();

//   handle route 
const login = require('./src/routes/ExecutiveLogin')
const enquiry = require('./src/routes/Enquiry')

// handle api path 

const apiRouter = express.Router();
apiRouter.use('/clients', login);
apiRouter.use('/enquiry', enquiry);
app.use('/api', apiRouter);



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
