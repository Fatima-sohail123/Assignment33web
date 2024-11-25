const express = require('express');
const router = express.Router();
const Fruit = require('../model/Fruit.js');

// Read operation - GET: Display list of fruits
router.get('/', async (req, res, next) => {
    try {
        const fruitList = await Fruit.find();
        res.render('Fruit/list', {
            title: 'Fruit Tracker',
            displayName: req.user ? req.user.displayName : '',
            FruitList: fruitList // Matches the variable name in view
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

// Create operation - GET: Display Add Page
router.get('/add', async (req, res, next) => {
    try {
        res.render('Fruit/add', {
            title: 'Add to Fruit Tracker',
            displayName: req.user ? req.user.displayName : ''
        });
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

// Create operation - POST: Process Add Page
router.post('/add', async (req, res, next) => {
    try {
        let newFruit = new Fruit({
            "Type_of_Fruit_or_Vegetable": req.body.Type_of_Fruit_or_Vegetable,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost
        });
        await Fruit.create(newFruit);
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

// Update operation - GET: Display Edit Page
router.get('/edit/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const fruitToEdit = await Fruit.findById(id);
        res.render('Fruit/edit', {
            title: 'Edit Fruit Information',
            displayName: req.user ? req.user.displayName : '',
            Fruit: fruitToEdit
        });
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error handler
    }
});

// Update operation - POST: Process Edit Page
router.post('/edit/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let updatedFruit = new Fruit({
            "_id": id,
            "Type_of_Fruit_or_Vegetable": req.body.Type_of_Fruit_or_Vegetable,
            "Seeds": req.body.Seeds,
            "Organic": req.body.Organic,
            "Pounds": req.body.Pounds,
            "Cost": req.body.Cost
        });
        await Fruit.findByIdAndUpdate(id, updatedFruit);
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        next(err); // Pass the error to the error handler
    }
});

// Delete operation - GET: Perform Delete Operation
router.get('/delete/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await Fruit.deleteOne({ _id: id });
        res.redirect('/fruitslist');
    } catch (err) {
        console.error(err);
        res.render('Fruit/list', {
            error: 'Error on Server'
        });
    }
});

module.exports = router;