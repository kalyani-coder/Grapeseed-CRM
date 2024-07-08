

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const maxLifeDataSchema = new mongoose.Schema({}, { strict: false, collection: 'MAXLIFE_DATA' });
const MaxLife_Data = mongoose.model('MAXLIFE_DATA', maxLifeDataSchema, 'MAXLIFE_DATA');

router.get('/', async (req, res) => {
    try {
        // console.log('Fetching data from MAXLIFE_DATA collection...');
        const getData = await MaxLife_Data.find();
        // console.log('Data fetched:', getData);
        if (getData.length === 0) {
            return res.status(404).json({ message: 'No data found' });
        }
        res.status(200).json(getData);
    } catch (e) {
        console.error('Error fetching data:', e);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE ROUTE BY ID 
router.delete("/:id" , async(req, res) => {
    try{
        const id = req.params.id
        const deletedData = await MaxLife_Data.findByIdAndDelete(id)
        if(!deletedData){
            return res.status(404).json({message : "Id Not found"})
        }
        res.status(200).json({message : "Data Successfully deleted"})

    }catch(e){
        res.status(500).json({message : "Internal server error"})
    }
})

// GET bY ALL VALUES 
router.get("/:field/:value", async (req, res) => {
    const field = req.params.field;
    const value = req.params.value.replace("_", " ");
    if (value && field) {
      try {
        const allData = await MaxLife_Data.find({ [field]: value });
        res.json(allData);
      } catch (e) {
        res.status(400).json({ message: "Bad request" });
      }
    } else {
      res.status(400).json({ message: "Bad request" });
    }
  });
  

module.exports = router