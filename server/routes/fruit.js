var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let fruit = require('../model/Fruit.js');
const Fruit = require('../model/Fruit.js');
let FruitController = require("../controllers/fruit.js")
router.get('/',async(req,res,next)=>{
try{
    const FruitList = await Fruit.find();
    res.render('Fruit/list',{
        title:'Fruit information',
        displayName: req.user ? req.user.displayName: "",
        FruitList:FruitList
    })}
    catch(err){
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Fruit/add',{
            title: 'Add Fruit',
            displayName: req.user ? req.user.displayName: ""
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newFruit = Fruit({
            "Type_of_Fruit_or_Vegetable":req.body.Type_of_Fruit_or_Vegetable,
            "Seeds":req.body.Seeds,
            "Organic":req.body.Organic,
            "Pounds":req.body.Pounds,
            "Cost":req.body.Cost
        });
        Fruit.create(newFruit).then(()=>{
            res.redirect('/fruitslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('Fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const fruitToEdit= await Fruit.findById(id);
        res.render('fruit/edit',
            {
                title:'Edit Fruit',
                displayName: req.user ? req.user.displayName: "",
                Fruit:fruitToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedFruit= Fruit({
            "_id":id,
            "Type_of_Fruit_or_Vegetable":req.body.Type_of_Fruit_or_Vegetable,
            "Seeds":req.body.Seeds,
            "Organic":req.body.Organic,
            "Pounds":req.body.Pounds,
            "Cost":req.body.Cost
        });
        Fruit.findByIdAndUpdate(id,updatedFruit).then(()=>{
            res.redirect('/fruitslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('fruit/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Fruit.deleteOne({_id:id}).then(()=>{
            res.redirect('/fruitlist')
        })
    }
    catch(error){
        console.error(err);
        res.render('fruit/list',{
            error:'Error on the server'
        })
    }
});

module.exports = router;