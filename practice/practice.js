const {animals} = require('./data/animals.json');

//console.log(animals);

let personalityTraitsArray = ['hungry', 'goofy'];
// Note that we save the animalsArray as filteredResults here:
let filteredResults = animals;

// personalityTraitsArray.forEach(trait => {
//     console.log(trait);
//     filteredResults = filteredResults.filter( animal => 
//         animal.personalityTraits.indexOf(trait) !== -1 );
    
// });

personalityTraitsArray.forEach(trait => {
    filteredResults.forEach(animal => {
        console.log(animal.personalityTraits.indexOf(trait));
    })
})