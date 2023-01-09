/*
 * This files holds all the code to test you REST API
 */

//Run once broswer has loaded everything
window.onload = function () {

// Creates an XMLHttpRequest object
var xhr = new XMLHttpRequest();

const mainURI = 'https://project-3-rest-with-mongodb-grw224.grahamwandless.repl.co';

// All expected outputs of tests assume each button is only pressed once and in order (unless otherwise specified)


// Creates a film with title "Super Film" and body "Good"
// No expected output
document.getElementById("create")
.addEventListener("click",function(e){
    xhr.open("POST", mainURI + '/films', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Super Film",
        body: "Good"
    }));
},false);

// Creates a film with title "Okay Film" and body "Decent"
// No expected output
document.getElementById("create2")
.addEventListener("click",function(e){
    xhr.open("POST", mainURI + '/films', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Okay Film",
        body: "Decent"
    }));
},false);

// Creates a review of the film with filmID 1, with title "Truely Super Film" and body "It's very good"
// No expected output
document.getElementById("create3")
.addEventListener("click",function(e){
    xhr.open("POST", mainURI + '/films/1/reviews', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Truely Super Film",
        body: "It's very good"
    }));
},false);

// Creates a review of the film with filmID 1, with title "Good Film" and body "Super"
// No expected output
document.getElementById("create4")
.addEventListener("click",function(e){
    xhr.open("POST", mainURI + '/films/1/reviews', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Good film",
        body: "Super"
    }));
},false);

// Returns an array of all films added to the database
// Expected Output: array containing 2 films
document.getElementById("read")
.addEventListener("click",function(e){
    fetch(mainURI + '/films')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("No data found"));
},false);

// Returns the film with filmID 1
// Expected Output: the film created by first create button 1
document.getElementById("read2")
.addEventListener("click",function(e){
    fetch(mainURI + '/films/1')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("No data found"));
},false);

// Returns an array of all reviews  for filmID 1
// Expected Output: array containing 2 reviews from the film with filmID 1
document.getElementById("read3")
.addEventListener("click",function(e){
    fetch(mainURI + '/films/1/reviews')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("No data found"));
},false);

// Returns an array of all reviews for filmID 1 which include the term "very"
// Expected Output: array containging 1 review from the film wiht filmID 1, created by create button 3
document.getElementById("read4")
.addEventListener("click",function(e){
    fetch(mainURI + '/films/1/reviews?search=very')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log("No data found"));
},false);

// Creates a third film, with title "Third Film" and body "Number 3"
// No expected output
// Running Button 1 will now return array containing 3 films
document.getElementById("update")
.addEventListener("click",function(e){
    xhr.open("PUT", mainURI + '/films/3', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Third Film",
        body: "Number 3"
    }));
},false);

// Updates the review with reviewID 1 of film with filmID 1
// No expected output
// Running Read Button 3 will show the updated review in the returned array
document.getElementById("update2")
.addEventListener("click",function(e){
    xhr.open("PUT", mainURI + '/films/1/reviews/1', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Actually Okay Film",
        body: "Not bad"
    }));
},false);

// Updates the film with filmID 2
// No expected output
// Running Read Button 1 will show the updated film in the returned array 
document.getElementById("update3")
.addEventListener("click",function(e){
    xhr.open("PUT", mainURI + '/films/2', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Pretty Good Film",
        body: "Actually alright"
    }));
},false);

// Creates a review with reviewID 1 for film with filmID 2
// No expected output
// Running Read Button 1 will show updated reviews field for film with filmID 2
document.getElementById("update4")
.addEventListener("click",function(e){
    xhr.open("PUT", mainURI + '/films/2/reviews/1', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        title: "Decent enough",
        body: "Pretty okay"
    }));
},false);

// Deletes film with filmID 3
// No expected output
// Running Read Button 1 will now only show 2 films
document.getElementById("destroy")
.addEventListener("click",function(e){
    xhr.open("DELETE", mainURI + '/films/3', true);
    xhr.send();
},false);

// Deletes review with reviewID 1 of film with filmID 1
// No expected output
// Running Read Button 3 will now return array of 1 review
document.getElementById("destroy2")
.addEventListener("click",function(e){
    xhr.open("DELETE", mainURI + '/films/1/reviews/1', true);
    xhr.send();
},false);

// Deletes film with filmID 4
// Will return 404 error, as no film with filmID 4 exists
document.getElementById("destroy3")
.addEventListener("click",function(e){
    xhr.open("DELETE", mainURI + '/films/4', true);
    xhr.send();
},false);

// Deletes review with reviewID 10 of film with filmID 1
// Will return 404 error, as no review with reviewID 10 exists
document.getElementById("destroy4")
.addEventListener("click",function(e){
    xhr.open("DELETE", mainURI + '/films/1/reviews/10', true);
    xhr.send();
},false);

};