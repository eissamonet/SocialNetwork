# SocialNetwork

## Table of Contents
- [Description](#description)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Usage](#usage)



## Description

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.

## User Story

AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

GIVEN a social network API
- WHEN I enter the command to invoke the application
- THEN my server is started and the Mongoose models are synced to the MongoDB database
- WHEN I open API GET routes in Insomnia for users and thoughts
- THEN the data for each of these routes is displayed in a formatted JSON
- WHEN I test API POST, PUT, and DELETE routes in Insomnia
- THEN I am able to successfully create, update, and delete users and thoughts in my database
- WHEN I test API POST and DELETE routes in Insomnia
- THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list


## Installation

- [Express.js](https://www.npmjs.com/package/express)
- [Mongoose](https://www.npmjs.com/package/mongoose)
- [Moment](https://www.npmjs.com/package/moment)
- [Node.js](https://nodejs.org/en/)
- [MonngoDB](https://www.npmjs.com/package/mongodb)


## Usage

- To start the server, run the following command in the terminal:
'npm start'.

- The user can test the routes using Insomnia Core. A message will be displayed in the terminal when the connection is successful.

- View a walk-through video [here](https://drive.google.com/file/d/1uouz0sNUwkdQv7EiMO-pYvEOIlb9qRJ3/view).

