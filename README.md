# travel-destination-mern-app

Users can create an account (authentication checks for users, login or logout for users), do CRUD with destinations and coments, browse destinations, check their location on map, comment

### Steps to install and run

 1.You need to have node and mongodb installed
 2.type "npm install" in your terminal to install all dependencies and dev-dependencies
 3.make a .env file with following values DATABASEURL, GEOCODER_PROVIDER, GEOCODER_API_KEY
 4.type "npm run start" in your terminal to run 


### Tech Stack

- Node.js : 10.16.3
- MongoDB : 4.2.0
- Express : 4.17.1
- Bootstrap : 4.4.1
- FontAwesome : 5.13.0
- Mapquest API: used for geocoding
- Mapbox API: used to show the maps

### Dependencies and Dev-dependancies

    body-parser
    connect-flash
    dotenv
    ejs
    express
    express-session
    geojson
    method-override
    moment
    mongoose
    node-geocoder
    passport
    passport-local
    passport-local-mongoose
    nodemon
