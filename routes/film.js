const express = require('express');
const Film = require('../models/Film.js');
const Review = require('../models/Review.js');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* GET URL Path /films */
router.get('/', function(req, res, next) {
  
  Film.find(function(err,filmList){
    var searchterm = req.query.search;
    // If there is no search term, proceed as normal
    if (searchterm == null) {
      res.send(filmList);
    }
    // If there is a search term, check the filmList for films matching the searchterm
    else {
      var returnArray = [];
      for (film of filmList) {
        // Checks if the search term is in the film's title, and, if it is, adds the film 
        // to the array
        if (film.title.includes(searchterm)) {
          returnArray.push(film);
        }
        // If the search term was not in the film's title, it checks if the search term 
        // is in the film's body, and, if it is, adds the film to the array
        else if (film.body.includes(searchterm)) {
          returnArray.push(film);
        }
      }
      res.send([returnArray]);
    }
  });

});

/* POST URL Path /films*/
router.post('/', function(req, res, next) {
  var reqBody = req.body;
  Film.find().sort('filmID').exec(function(err, sorted){
  var newID = sorted[sorted.length - 1];
  //var best = sorted[sorted.length - 1];
  console.log(newID);
  // If there are films in the database, use the highest filmID to make a new filmID
  if (newID != null) {
    var newFilm = new Film({filmID:newID.filmID + 1, title:reqBody.title, body:reqBody.body, date:Date.now()});
    newFilm.validate(function(err) {
      if (err)
          res.status(400).send();
      else
          Film.create(newFilm);
          res.status(201).send();
    });}
  // If there are no films in the database, create one with filmID 1
  else {
    var newFilm = new Film({filmID:1, title:reqBody.title, body:reqBody.body, date:Date.now()});
    newFilm.validate(function(err) {
      if (err)
          res.status(400).send();
      else
          Film.create(newFilm);
          res.status(201).send();
    });
  }
  
  })
});


/* GET URL Path /films/:film_id */
router.get('/:film_id', function(req, res, next) {
  var filmId = req.params.film_id;
  Film.findOne({filmID: filmId}, function(err,film){
    if (film == null) {
      res.status(404).send([]);
    }
    else {
      res.status(200).send(film);
    }
  });
});

/* PUT URL Path /films/:film_id*/
router.put('/:film_id', function(req, res, next) {
  var reqBody = req.body;
  var filmId = req.params.film_id;
  // Searches for the film with the specified filmID 
  Film.findOne({filmID: filmId}, function(err, film) {
      // If it doesn't find one, creates it
      if (film == null) {
        var newFilm = new Film({filmID:filmId, title:reqBody.title, body:reqBody.body, date:Date.now()});
        newFilm.validate(function(err) {
          if (err)
              res.status(400).send();
          else
              Film.create(newFilm);
              res.status(201).send();
        });
      }
      // If it does find one, it updates it
      else {
          film.title = reqBody.title;
          film.body = reqBody.body;
          film.date = Date.now();
          film.validate(function(err) {
          if (err)
              res.status(400).send();
          else
              film.save();
              res.status(201).send();
        });
      }
  });
});

/* DELETE URL Path /films/:film_id */
router.delete('/:film_id', function(req, res, next) {
  var filmId = req.params.film_id;
  // Searches for the review with the specified filmID
  Film.findOne({filmID: filmId}, function(err,film){
    // If the film is not found, report 404 error
    if (film == null) {
      res.status(404).send();
    }
    // Otherwise, delete the film
    else {
      Film.deleteOne({filmID: filmId}, function(err){
        if (err){
          res.status(404).send();
        }
        else{
          res.status(200).send();
        }
      });
    }
  });
});

/* POST URL Path /films/:film_id/reviews*/
router.post('/:film_id/reviews', function(req, res, next) {
  var reqBody = req.body;
  var filmId = req.params.film_id;
  
  Film.findOne({filmID: filmId}, function(err,film){
    // If the film is not found, report 404 error
    if (film == null) {
      res.status(404).send();
    }
    // Otherwise, attempt to add the review
    else {
      // Get the list of reviews and figure out the highest ID
      var reviews = film.reviews;
      //console.log(reviews.length);
      // If there are reviews in the array, it finds the highest ID and uses that to create
      // the new Review
      if (reviews.length != 0) {
        reviews.sort((a,b) => (a.reviewID >= b.reviewID) ? 1 : -1);
        var newID = reviews[reviews.length - 1];
        var newReview = new Review({reviewID:newID.reviewID + 1, title:reqBody.title, body:reqBody.body, date:Date.now()});
        film.validate(function(err) {
          if (err)
              res.status(400).send();
          else
              film.reviews.push(newReview);
              film.save();
              res.status(201).send();
        });
      }
      // If there are no reviews in the array, it simply adds the review with a reviewID
      // of 1
      else {
        var newReview = new Review({reviewID:1, title:reqBody.title, body:reqBody.body, date:Date.now()});
        //console.log(newReview.reviewID);
        film.validate(function(err) {
          if (err)
              res.status(400).send();
          else
              film.reviews.push(newReview);
              film.save();
              res.status(201).send();
        });
      }
    }
  });
});

/* GET URL Path /films/:film_id/reviews */
router.get('/:film_id/reviews', function(req, res, next) {
  var filmId = req.params.film_id;
  Film.findOne({filmID: filmId}, function(err,film){
    if (film == null) {
      res.status(404).send([]);
    }
    else {
      var searchterm = req.query.search;
      // If there is no search term, proceed normally
      if (searchterm == null) {
        res.status(200).send(film.reviews);
      }
      // If there is a search term, check the reviews array for reviews matching the
      // search term
      else {
        var returnArray = [];
        for (review of film.reviews) {
          // Checks if the search term is in the review's title, and, if it is, adds the 
          // review to the array
          if (review.title.includes(searchterm)) {
            returnArray.push(review);
          }
          // If the search term was not in the review's title, it checks if the search 
          // term is in the review's body, and, if it is, adds the review to the array
          else if (review.body.includes(searchterm)) {
            returnArray.push(review);
          }
        }
        res.send([returnArray]);
      }
    }
  });
});

/* GET URL Path /films/:film_id/reviews/:review_id */
router.get('/:film_id/reviews/:review_id', function(req, res, next) {
  var filmId = req.params.film_id;
  var reviewId = req.params.review_id;
  Film.findOne({filmID: filmId}, function(err,film){
    if (film == null) {
      res.status(404).send([]);
    }
    else {
      //var status = 404;
      //var returnReview = [];
      var found = false;
      for (review of film.reviews) {
        if (review.reviewID == reviewId) {
          //status=200;
          //returnReview = review;
          res.status(200).send(review);
          found = true;
          break;
        }
      }
      if (!found) {
        res.status(404).send([]);
      }
    }
  });
});


/* PUT URL Path /films/:film_id/reviews/:review_id */
router.put('/:film_id/reviews/:review_id', function(req, res, next) {
  var reqBody = req.body;
  var filmId = req.params.film_id;
  var reviewId = req.params.review_id;

  // Find the specified film
  Film.findOne({filmID: filmId}, function(err,film){
    // If the film is not found, report 404 error
    if (film == null) {
      res.status(404).send();
    }
    // Otherwise, attempt to find and add the review
    else {
      // Get the list of reviews and look for the specified review
      var reviews = film.reviews;
      //console.log(reviews.length);
      // If there are reviews in the array, it searches for the specified review ID
      if (reviews.length != 0) {
        var found = false;
        // Looks for the specified reviewID
        for (review of film.reviews) {
          // If it finds the specified reviewID, it removes the review and adds a new version of it
          if (review.reviewID == reviewId) {
            var reviewIndex = film.reviews.indexOf(review);
            film.reviews.splice(reviewIndex, 1);
            var newReview = new Review({reviewID:reviewId, title:reqBody.title, body:reqBody.body, body2:reqBody.body, date:Date.now()});
            film.validate(function(err) {
              if (err)
                  res.status(400).send();
              else
                  film.reviews.push(newReview);
                  film.save();
                  res.status(201).send();
            });
            found = true;
            break;
          }
        }
        // If the specified review is not found, it simply adds the review with the
        // specified reviewID
        if (!found) {
          var newReview = new Review({reviewID:reviewId, title:reqBody.title, body:reqBody.body, body2:reqBody.body, date:Date.now()});
          //console.log(newReview.reviewID);
          film.validate(function(err) {
              if (err)
                res.status(400).send();
            else
                film.reviews.push(newReview);
                film.save();
                res.status(201).send();
          });
        }
      }
      // If the reviews array is empty, it simply adds the review with the
      // specified reviewID
      else {
        var newReview = new Review({reviewID:reviewId, title:reqBody.title, body:reqBody.body, body2:reqBody.body, date:Date.now()});
        //console.log(newReview.reviewID);
        film.validate(function(err) {
          if (err)
              res.status(400).send();
          else
              film.reviews.push(newReview);
              film.save();
              res.status(201).send();
        });
        res.status(201).send();
      }
  }});
});


/* DELETE URL Path /films/:film_id/reviews/:review_id */
router.delete('/:film_id/reviews/:review_id', function(req, res, next) {
  var filmId = req.params.film_id;
  var reviewId = req.params.review_id;
  Film.findOne({filmID: filmId}, function(err,film){
    if (film == null) {
      res.status(404).send([]);
    }
    else {
      var found = false;
      // Searches the reviews array for the specified review
      for (review of film.reviews) {
        // If the review is found, deletes it from the array
        if (review.reviewID == reviewId) {
          var reviewIndex = film.reviews.indexOf(review);
          film.reviews.splice(reviewIndex, 1);
          film.save();
          found = true;
          break;
        }
      }
      // If it is not found, responds with 404
      if (!found) {
        res.status(404).send();
      }
    }
  });
});

module.exports = router;