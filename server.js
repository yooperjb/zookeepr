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

function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array: (hungry, zany, etc.). Filter results if animal has trait (index returns -1 if trait doesn't exist)

        personalityTraitsArray.forEach(trait => {
            //filteredResults = filteredResults.filter( animal => animal.personalityTraits.indexOf(trait) !== -1 );
            filteredResults = filteredResults.filter( animal => animal.personalityTraits.includes(trait));
        });
    }
    
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    // return the filtered results
    return filteredResults;
};

// get a specific animal by id
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    
    const animal = body;
    
    // add animal to animalsArray
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({animals: animalsArray}, null, 2)
    );
        
    return animal;
}

// validate data from req.body
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string'){
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
};

// get method requires two arguments. 1. string that describes the route to fetch from. 2. callback function that executes every time that routed is accessed with a GET request. 
app.get('/api/animals', (req, res) => {
    // res is short for response - send for short, json for sending json files.
    //res.send('Hello!');
    let results = animals;
    if (req.query) {
        console.log("Req query: ", req.query);
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// new GET route for animals
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// app post route
app.post('/api/animals', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not proerply formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});


app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});