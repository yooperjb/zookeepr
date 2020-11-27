const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// get method requires two arguments. 1. string that describes the route to fetch from. 2. callback function that executes every time that routed is accessed with a GET request. 
router.get('/animals', (req, res) => {
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
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// app post route to animals
router.post('/animals', (req, res) => {
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

// export router
module.exports  = router;