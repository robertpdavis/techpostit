# techpostit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
Tech Post It is a Node.js - Express API blogging application. It allows for full CRUD functionality (via GET, POST, UPDATE and DELETE) for posts and POST for users and comments. All data is stored in a mysql database and uses the Seqelize ORM to simplify the database interactions.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence](#Licence)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Node.js must be installed. Required npm packages:
* Express
* mysql2
* sequelize
* dotenv
* express-session 
* express-session-seqelize
* expess-handlebars
* bcrypt

Firstly initialise the npm in the directory for the application by typing npm init in the console. The dependencies can be installed by typing npm install. Ensure the package.json and package-lock.json files are included in the directory. For localhost use, you will need to create a new mysql database (techpostit_db) see db/schema.sql and can populate sample data with node ./seeds/. You will also need to create a .env file for database connection details. Make sure this file is noted in .gitignore.

If installing on Heroku, you will need to create a new app and git push on Heroku. The JAWSDB addon is required and make sure the config/connection.js refers to the process.env.JAWSDB_URL var. You will also need to create a SECRET config var in Heroku for the session secret.

You can use your local repo to seed the database by getting the JAWSDB url details by typing heroku config:get JAWSDB_URL in the console (or via the url) and using that for you seed connection.

File structure of the application:
```md
.
├── config/                // contains the sequelize connection.js file
├── controllers/                // contains the route files
├── db/                    // schema for creating database
├── models/                // the sequelize database model files
├── seeds/                 // contains seed data for the database
├── utils/                 // authentication and other helpers
├── views/                 // handlebars layout and view files
├── .env.EXAMPLE/          // exmaple env file for the database environmental variables
├── .gitignore             // indicates which folders and files Git should ignore
├── LICENCE                // licence file
├── server.js              // main code script to run application
├── package-lock.json      
└── package.json           
```

## Usage
Run the server application by typing npm start in the console. The following routes are then available:
homeroutes
- GET / > home page
- GET /dashboard > user dashboard page
- GET /dashboard > user create post page
- GET /dashboard/view/:id > user view post page (with update and delete options)
- GET /post/:id > general view post and comments and add comment
- GET /login > login page
- GET /signup > sigup page
api routes
- POST /user/ > create user
- POST /user/login/ > login and set session
- POST /user/logout/ > logout and destrou session
- POST /post/ > create post
- POST /post/comment > create comment
- PUT /post/:id > update post
- DELETE /post/:id > delete post

Live website is available on AWS at: https://techpostit.robpdavis.com.au 

## Credits
Rob Davis Github: [robertpdavis](https://github.com/robertpdavis)

## Licence
MIT License

## Contributing
Please contact me at: robertpdavis@optusnet.com.au

## Tests
No tests are included.

## Questions
* Github: [robertpdavis](https://github.com/robertpdavis)
* Email: robertpdavis@optusnet.com.au
