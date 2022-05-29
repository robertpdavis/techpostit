# techpostit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
E-server is a Node.js - Express API application for an ecommerce server. It allows for full CRUD functionality (via GET, POST, UPDATE and DELETE) API requests for products, product categories and tags. All data is stored in a mysql database and uses the Seqelize ORM to simplify the database interactions.


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Licence](#Licence)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Node.js must be installed. The npm Express, mysql2, sequelize and dotenv packages are also required. Firstly initialise the npm in the directory for the application by typing npm init in the console. The dependencies can be installed by typing npm install. Ensure the package.json and package-lock.json files are included in the directory. You will need to create a new mysql database (ecommerce_db) see db/schema.sql and can populate sample data with node ./seeds/. You will also need to create a .env file for database connection details. Make sure this file is noted in .gitignore.

File structure of the application:
```md
.
├── config/                // contains the sequelize connection.js file
├── db/                    // schema for creating database
├── models/                // the sequelize database model files
├── routes/                // contains the API route files
├── seeds/                 // contains seed data for the database
├── .env.EXAMPLE/          // exmaple env file for the database environmental variables
├── .gitignore             // indicates which folders and files Git should ignore
├── LICENCE                // licence file
├── server.js              // main code script to run application
├── package-lock.json      
└── package.json           
```

## Usage
Run the server application by typing npm start in the console. The following API routes are then available:
- /api/products/: GET route to return all products. Returns JSON for all products including product tags.
- /api/products/id: GET route to retunr single product by id. Returns JSON for the product including product tags.
- /api/products/: POST route to create product. Returns JSON for created product including product tags.
- /api/products/id: PUT route to update product. Returns JSON for updated product including product tags.
- /api/products/id: DELETE route to delete product. Returns 1 if product deleted.

The same functionality applies for /api/categories/ and /api/tags/

Product create and update structure:
```md
{
	"product_name": "Basketball",
	"price": 250.00,
	"stock": 10,
	"category_id": 6,
	"tagIds": [9]
}
```

Category create and update structure:
```md
{
	"category_name": "Sporting Goods"
}
```

Tag create and update structure:
```md
{
	"tag_name": "Limited Edition"
}
```

See this video link for further details on setting up and seeding the database and launching the application : https://drive.google.com/file/d/1ZSVkYp5uIMPVC3JZmzL1WDquDrdhYCST/view

See this video link for further details on using the API (exmaple uses Insomnia) : https://drive.google.com/file/d/10KPAho4PU2nRMWOeT94qNoepmz2WIp-x/view

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
