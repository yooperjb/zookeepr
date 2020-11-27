// these will read the index.js files in each folder
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// filesystem
const fs = require('fs');
const path = require('path');
const express = require('express');
const {animals} = require('./data/animals.json');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// this makes files in public available for use
app.use(express.static('public'));


app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});