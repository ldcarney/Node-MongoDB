const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const { boolean } = require('joi');
const router = express.Router();



router.get('/', async (req, res) =>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
    //res.render('index', {title: 'My Express App', message: 'Hello'});
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    //400 Bad request
    if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer ({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
});

//Update Customer
router.put('/:id', async (req, res) =>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, 
    {
        new: true
    });
    
    //If doesn't exist respond with 404
    if (!customer) return res.status(404).send("The Customer with the given ID does not exist");

    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send("The Customer with the given ID does not exist");

    res.send(genre);
});

router.get('/:id', async (req, res) =>{
    const customer = await Customer.findById(req.params.id);

    //const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send("The Customer with the given ID does not exist");
    res.send(customer)
});




module.exports = router;
