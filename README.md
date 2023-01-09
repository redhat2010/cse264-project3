[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=4457327&assignment_repo_type=AssignmentRepo)
# CSE264 Project 3: Building a REST API with MongoDB
## Due: Wed, April 7, 2021 at 11:59 PM

Graham Wandless grw224@lehigh.edu

In this assignment, you will use Node.js, Express.js and MongoDB to create your own REST API for Films, and Film Reviews. You will also write some frontend javascript code to test your REST API.

All the code and packages you need is in this GitHub Classroom repo. Do not install any other packages.

### REST API
Your API will have a collection "Films", and a sub-collection "Film Reviews".

You will need to implement the following URI routes:

* POST - /films
  * This should accept a JSON body and create a new film element in the film collection
  * ID and DATE should be created server side (ID should be a number)
  * Any invalid data upload (missing fields) should return a 400 error
  * The only field that has to be unique is Film ID
* GET - /films
  * Return a JSON listing of all films in Database.
* GET - /films/[film_id]
  * This should return in JSON the contents on this film. If no such film exists, it should return a 404. If any reviews are in this film, it should return all of them as well.
* PUT - /posts/[post_id]
  * This should accept a JSON body and update the film by [film_id]. If this film does not exist, it should create it.
* DELETE - /films/[film_id]
  * This should delete the film. Return 404 if no such film exists.
* POST - /films/[film_id]/reviews
  * This should accept a JSON body and create a review element in the reviews collection of the film identified by [film_id].
  * ID and DATE should be created server side (ID should be a number)
  * Any invalid data upload (missing fields) should return a 400 error
  * The only field that has to be unique is Review ID
* GET - /films/[film_id]/reviews
  * Return a JSON listing of all reviews from the film identified by [film_id].
* GET - /films/[film_id]/reviews/[review_id]
  * This should return in JSON the review on this film. If no such review exists, it should return a 404
* PUT - /films/[film_id]/reviews/[review_id]
  * This should accept a JSON body and update the review identified by [review_id]. If this review does not exist, it should create it.
* DELETE - /films/[film_id]/reviews/[review_id]
  * This should delete the review. Return 404 if no such review exists.

Also create search functionality for your API.
* GET - /films?search=[search_Query]
  * Return a JSON listing of all films that have [search_Query] in the Title or Body.
* GET - /films/[film_id]/reviews?search=[search_Query]
  * Return a JSON listing of all reviews from the post identified by [film_id] that have [search_Query] in the Title or Body.

Schema for Film
* Film ID
  * ID for Film
* Title
  * Title of the Film
* Body
  * Description of the Film
* Date
  * Date when Film was added to API

The JSON should be in this format (i.e. same names)
```json
{
   "FilmID":12, 
   "Title":"Citizen Kane", 
   "Body":"Rosebud!",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT",
} 
```

Schema for Review
* Review ID
  * ID for Review
* Title
  * Title of Review
* Body
  * Body of Review
* Date
  * Date when Review was created

The JSON should be in this format (i.e. same names)
```json
{
   "ReviewID":21, 
   "Title":"Citizen LAME!!!", 
   "Body":"It's just his stupid sled! That's it! I saved to 3 hours.",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT"
} 
```

Note its a good idea to have "reviews" as a subdocument to "films". If you chose to do this, be sure to call that subdocument "reviews"

The JSON should be in this format (i.e. same names)
```json
{
   "FilmID":12, 
   "Title":"Citizen Kane", 
   "Body":"Rosebud!",
   "Date":"Wed, 24 Mar 2021 15:37:46 GMT",
   "Reviews":[
    {
     "ReviewID":21, 
     "Title":"Citizen LAME!!!", 
     "Body":"It's just his stupid sled! That's it! I saved to 3 hours.",
     "Date":"Wed, 24 Mar 2021 15:37:46 GMT"
    } 
   ]
} 
```


### Frontend Testing
You will also need to test all the routes listed above, using similar AJAX requests you used in Project 1 and 2. I want to see 4 examples of Create, Read, Update, and Destroy on the Film Collection (be sure to add reviews to your Film test as well). You can hard code this with any information you want. I just want to see examples of you using your own API. A basic index.pug page with some buttons have been created for you in this project. The code in /public/javascripts/main.js will fire when pressing these buttons. Feel free to add new buttons to create more events, or test other behaviour. Write comments in main.js to describe your tests and what expected output is. 

### Install and Run
You must have node.js running on your machine. Once you have cloned this project you can run `npm install` to install all the packages for this project. Then running `npm run dev` will run the dev version of this code, which will run this project with nodemon. Nodemon auto-restarts the node server every time you make a change to a file. Very helpful when you are writing and testing code.

### .env and MongoDB
You need to have a MongoDB server running before launching your API. You can
download MongoDB [here](https://www.mongodb.com/download-center/community), or install it via a package manager.
Windows users, read [Install MongoDB on Windows](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/).

You can also use
[MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or [Compose](https://www.compose.io/) instead of downloading and installing MongoDB locally. 

Which ever you do, you will need to cretae a .env from the .env.example 
You can do this by `cp .env.example .env`

Then store your MongoDB URI connection in your  `.env` file.

**Note:** Never EVER push private information (like MongoDB connection URIs) to a Git Repo. We use .env to store this connection inforation and ensure that git (using .gitignore) never pushs this private information in the repo. Never ever store real credentials in `.env.example` or anywhere that is not `.env` as you may push these changes to your git repo.

### Get Hosted MongoDB Atlas

From [https://github.com/sahat/hackathon-starter#deployment](https://github.com/sahat/hackathon-starter#deployment)

- Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Click the green **Get started free** button
- Fill in your information then hit **Get started free**
- You will be redirected to Create New Cluster page.
- Select a **Cloud Provider and Region** (such as AWS and a free tier region)
- Select cluster Tier to **Free Shared Clusters**
- Give Cluster a name (default: Cluster0)
- Click on green **:zap:Create Cluster button**
- Now, to access your database you need to create a DB user. To create a new MongoDB user, from the **Clusters view**, select the **Security tab**
- Under the **MongoDB Users** tab, click on **+Add New User**
- Fill in a username and password and give it either **Atlas Admin** User Privilege
- Next, you will need to create an IP address whitelist and obtain the connection URI.  In the Clusters view, under the cluster details (i.e. SANDBOX - Cluster0), click on the **CONNECT** button.
- Under section **(1) Check the IP Whitelist**, click on **ALLOW ACCESS FROM ANYWHERE**. The form will add a field with `0.0.0.0/0`.  Click **SAVE** to save the `0.0.0.0/0` whitelist.
- Under section **(2) Choose a connection method**, click on **Connect Your Application**
- In the new screen, select **Node.js** as Driver and version **2.2.12 or later**. _*WARNING*_: Do not pick 3.0 or later since connect-mongo can't handle mongodb+srv:// connection strings.
- Finally, copy the URI connection string and replace the URI in MONGODB_URI of `.env.example` with this URI string.  Make sure to replace the <PASSWORD> with the db User password that you created under the Security tab.
- Note that after some of the steps in the Atlas UI, you may see a banner stating `We are deploying your changes`.  You will need to wait for the deployment to finish before using the DB in your application.


**Note:** As an alternative to MongoDB Atlas, there is also [Compose](https://www.compose.io/).

### Grading
* **80 Points** - REST API works as descibed in this README. All routes and search works as expected. All inputs are validated and correct errors are returned to client
* **15 Points** - Frontend Test Create, Read, Update, Destory on Film collection.
* **5 Points** - Backend and Frontend code is well commented and easy to read/follow.

* If code doesn't run/compile you can get no more than a 65. But please write comments and a README to explain what you were trying to do. 


