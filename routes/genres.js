const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) =>{
    const genres = await Genre.find().sort('name');
    res.send(genres);
    //res.render('index', {title: 'My Express App', message: 'Hello'});
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    //400 Bad request
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre ({name: req.body.name});
    genre = await genre.save();
    res.send(genre);
});

//Update Genre
router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });
    
    //If doesn't exist respond with 404
    if (!genre) return res.status(404).send("The Genre with the given ID does not exist");

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("The Genre with the given ID does not exist");

    res.send(genre);
});

router.get('/:id', async (req, res) =>{
    const genre = await Genre.findById(req.params.id);

    //const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("The Genre with the given ID does not exist");
    res.send(genre)
});


module.exports = router;