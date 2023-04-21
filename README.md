# Employee Tracker

## Description

- The goal was to create a mock e-commerce back end to familiarize myself with e-commerce databases functionality
- I was able to better utilize CRUD to manage data
- I was able to utilze the sequilize package as my ORM instead of writing raw SQL

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Installation

- Clone the [repo](https://github.com/andrewmuhn/e-commerce) to your local machine.
- Navigate to that file directory and run from your terminal:

```bash
	npm i
```

> **Note**: Node.js and npm need to be installed to perform this action. Installing Node.js will also install npm

- Then in order to source the database run from your terminal:

```bash
	mysql -u root -p
	SOURCE path/to/schema.sql
```

> **Note**: MySql needs to be installed in order to run these commands. Root is the default username but may be different if you selected otherwise. The first command will prompt you for your mySQL password created on installation

- Then create a .env file and copy the contents of the .env.example over and add your mySQL username and password to the appropraite fields. See below as an example.

```env
	DB_NAME: "ecommerce_db"
	DB_USER: "root"
	DB_PASS: "Your Password"
```

- Then you in order to seed the database with test data run from your terminal:

```bash
	npm run seed
```

![Setup Gif](./Assets/ecommerce-setup.gif)

## Usage

- Follow the above installation steps to get started.
- Then run from your terminal:

```bash
	npm start
```

View all Categories, Products, and Tags
![View](./Assets/ecommerce-get-all.gif)

Create a Category, Product, and Tag
![Create](./Assets/ecommerce-create.gif)

Update a Category, Product, and Tag
![Update](./Assets/ecommerce-update.gif)

Delete a Category, Product, and Tag
![Delete](./Assets/ecommerce-delete.gif)

[Link to repo](https://github.com/andrewmuhn/e-commerce)

[Link to video walkthrough of application](https://drive.google.com/file/d/1iHjpHM_3pMpDzXfi6_TGDGwU5bj0fqEB/view)

## Credits

Project created by [Andrew Muhn](https://github.com/andrewmuhn)
as part of UofO Edx Bootcamp

Utilized:

- [node.js](https://nodejs.org/en/about)
- [mysql2](https://github.com/sidorares/node-mysql2#readme)
- [express](https://www.npmjs.com/package/express)
- [sequilize](https://sequelize.org/docs/v6/getting-started/)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [nodemon](https://www.npmjs.com/package/nodemon)

Credits to tutorials and forums used:

- Help from TA understanding logic behind the product update route.
