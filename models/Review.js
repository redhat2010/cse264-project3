const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
  reviewID:{type: Number, required: true},
  title:{type: String, required: true},
  body:{type: String, required: true},
  date:{type:Date, default:Date.now}
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
