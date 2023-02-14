# Trips Website

This is a Node.js web application for a trips website that allows users to save trips on a map.

## Requirements

- Node.js
- Express.js
- MySQL database

## Installation

1. Clone the repository to your local machine

git clone https://github.com/yourusername/trips-website.git

2. Navigate to the project directory

cd trips-website

3. Install the dependencies

npm install

4. Create a MySQL database and configure the database settings in the `config/db.js` file

5. Start the development server

npm start

## API Endpoints

The following API endpoints are available for the trips website:

- POST `/Create`: create a new trip
- GET `/getTripById`: find a trip by id
- GET `/getAllTrips`: find all trips with username
- PUT `/editTrip`: update a trip with id
- DELETE `/deleteTrip`: delete a trip with id

## Create Tables

`CREATE TABLE Trips (
  destination VARCHAR(255),
  hotel VARCHAR(255),
  username VARCHAR(255),
  phoneNumber VARCHAR(255),
  nightLife INTEGER,
  landscape INTEGER,
  shopping INTEGER,
  finalGrade INTEGER,
  english INTEGER,
  hebrew INTEGER,
  else INTEGER,
  dates VARCHAR(255),
  recommendations VARCHAR(255),
  description VARCHAR(255),
  top3 VARCHAR(255),
  lat FLOAT,
  lng FLOAT
);
`

## Contributing

Please feel free to contribute to this project by creating pull requests or su
