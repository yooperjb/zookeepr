const express = require('express');
const {animals} = require('./data/animals.json');

const app = express();

app.listen(3001, () => {
    console.log('API server now on port 3001!');
})


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

// get method requires two arguments. 1. string that describes the route to fetch from. 2. callback function that executes every time that routed is accessed with a GET request. 
app.get('/api/animals', (req, res) => {
    // res is short for response - send for short, json for sending json files.
    //res.send('Hello!');
    let results = animals;
    if (req.query) {
        console.log("Req query: ", req.query);
        console.log(typeof req.query);
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});