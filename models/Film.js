const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('../models/Film.js');

const filmSchema = new mongoose.Schema({
  filmID:{type: Number, index: {unique: true} },
  title:{type: String, required: true},
  body:{type: String, required: true},
  date:{type:Date, default:Date.now},
  reviews:[Review]
 });




const Film = mongoose.model('Film', filmSchema);
//const Review = mongoose.model('Review', reviewSchema);

module.exports = Film;
