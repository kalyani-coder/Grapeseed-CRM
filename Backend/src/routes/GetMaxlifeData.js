

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



module.exports = router