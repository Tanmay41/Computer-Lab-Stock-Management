# Introduction

This is an example of how you can structure your code for a stock management app with user authentication, CRUD operations, error handling, and security measures

# Stock Management App

This app allows you to manage stock items and their quantities. You can add new items, edit existing ones, and delete items from the list.

## Prerequisites

- Node.js and npm installed on your computer.
- PostgreSQL database set up.

## Setup

1. Clone the repository.
2. CD into your directory by using `cd Computer-Lab-Stock-Management`
3. Install the dependencies by running `npm install`.
4. Set up your database and obtain the connection string (I used cockroachDB).
5. Create a `.env` file in the root directory and add the connection string.
6. Run the website useing `nodemon index.js`
7. Open http://localhost:3000/ to see the application in action.</s>

# Contribute

If you want to contribute, you can add the following:

- [ ] redirect to /stock with post request after edit, add or delete <br />
- [ ] fix bug where if you click "add stock" without filling anything out it would still create an item in the db
