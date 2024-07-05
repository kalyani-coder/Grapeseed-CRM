
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors')
const multer = require('multer');
const port = process.env.PORT || 4000
require('dotenv').config()

// middlewares 
const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use('/public', express.static('public'));
app.use(cors());

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  
  mongoose.connect(process.env.NEW_DB_URI)
  .then(() => {
      console.log('DB connection successful');
  })
  .catch((err) => {
      console.error('DB connection error:', err);
  });

//   handle route 
const login = require('./src/routes/ExecutiveLogin')
const enquiry = require('./src/routes/Enquiry')
const max_life_data = require("./src/routes/GetMaxlifeData")


// handle api path 
const apiRouter = express.Router();
apiRouter.use('/clients', login);
apiRouter.use('/enquiry', enquiry);
apiRouter.use('/maxlifedata', max_life_data);
app.use('/api', apiRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
