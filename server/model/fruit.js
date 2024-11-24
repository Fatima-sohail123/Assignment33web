//const { Collection, default: mongoose } = require("mongoose");

const mongoose = require("mongoose");

let fruitModel = mongoose.Schema({
    Type_of_Fruit_or_Vegetable: String,
    Seeds: String,
    Organic: String,
    Pounds: String,
    Cost: Number
},
{
    collection:"Fruit_Farm"
});
module.exports =mongoose.model('Fruit',fruitModel);
