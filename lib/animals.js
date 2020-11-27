const fs = require("fs");
const path = require("path");

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
        console.log(personalityTraitsArray);
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
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({animals: animalsArray}, null, 2)
    );
        
    return animal;
};

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

// export file functions
module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
  };