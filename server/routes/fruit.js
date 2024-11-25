const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fruit = require('../model/Fruit.js');

// List All Fruits
router.get('/', async (req, res, next) => {
    try {
        const fruitList = await Fruit.find();
        res.render('fruit/list', {
            title: 'Fruit Information',
            displayName: req.user ? req.user.displayName : "",
            FruitList: FruitList // Ensure variable names match
        });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching fruits', error: err });
    }
});

// Display Add Page
router.get('/add', async (req, res, next) => {
    try {
        res.render('fruit/add', {
            title: 'Add Fruit',
            displayName: req.user ? req.user.displayName : ""
        });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error displaying add page', error: err });
    }
});

// Process Add Page
router.post('/add', async (req, res, next) => {
    try {
        const newFruit = new Fruit({
            Type_of_Fruit_or_Vegetable: req.body.Type_of_Fruit_or_Vegetable,
            Seeds: req.body.Seeds,
            Organic: req.body.Organic,
            Pounds: req.body.Pounds,
            Cost: req.body.Cost
        });
        await newFruit.save();
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error adding fruit', error: err });
    }
});

// Display Edit Page
router.get('/edit/:id', async (req, res, next) => {
    try {
        const fruitToEdit = await Fruit.findById(req.params.id);
        res.render('fruit/edit', {
            title: 'Edit Fruit',
            displayName: req.user ? req.user.displayName : "",
            Fruit: fruitToEdit
        });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching fruit for edit', error: err });
    }
});

// Process Edit Page
router.post('/edit/:id', async (req, res, next) => {
    try {
        await Fruit.findByIdAndUpdate(req.params.id, {
            Type_of_Fruit_or_Vegetable: req.body.Type_of_Fruit_or_Vegetable,
            Seeds: req.body.Seeds,
            Organic: req.body.Organic,
            Pounds: req.body.Pounds,
            Cost: req.body.Cost
        });
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error updating fruit', error: err });
    }
});

// Delete Fruit
router.get('/delete/:id', async (req, res, next) => {
    try {
        await Fruit.findByIdAndDelete(req.params.id);
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error deleting fruit', error: err });
    }
});

// Display Fruit List
router.get('/fruitslist', async (req, res) => {
    try {
        const fruitList = await Fruit.find();
        res.render('fruit/products', {
            title: 'Fruit Information',
            displayName: req.user ? req.user.displayName : "",
            fruitList: fruitList
        });
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error fetching fruit list', error: err });
    }
});

module.exports = router;