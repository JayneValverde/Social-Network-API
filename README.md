# Social-Network-API
## Jayné M. Valverde <br>
NoSQL Database Challenge

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

### **_[LINK TO WALKTHROUGH VIDEO](https://youtu.be/5_GRDfMp2EQ?si=Y-BGfmIl5jj5ipz2)_**
### **_[LINK TO FIXED ---POST REACTION ROUTE--- VIDEO](https://youtu.be/1leVdSL3Y6M?si=7Ct3_QcUUMo86OFc)_**

## Description: 
An API built for a social network web application that uses a NoSQL database. This allows websites to handle large amounts of unstructured data. Once you enter the command to invoke start the application, your server starts and Mongoose models are synced to the MongoDb database. You will then be able to create users, create and delete thoughts and reactions, as well as add and remove friends from a users friend list. 

## Table of Contents: 
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Users](#users)
* [Thoughts](#thoughts)
* [Friends](#friends)
* [Reactions](#reactions)
* [License](#license)
* [Resources](#resources)
* [Questions](#questions)

## User Story: 
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria: 
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation: 
In order to set up this project, take the followeing steps: 

***Note***: You must have MongoDb installed to run this API. 

**STEP 1**: Clone repository. you can do this by running `git clone`  
`https://github.com/JayneValverde/Social-Network-API` withing your terminal. 

**STEP 2**: Install dependencies by running `npm install `

**STEP 3**: Start the server `node index.js`

**STEP 4**: Open up `Insomnia`

**STEP 5**: Create, update, read, and delete users, thoughts and reactions. 



## Users: 
| HTTP Method 	| Route                                   	| Description     
-------------   |------------------------------------------ |------------------
| GET           | http://localhost:3001/api/users          	| To `GET` all users
| GET           | http://localhost:3001/api/users/:id       | To `GET` a Single User with `userId`
| POST          | http://localhost:3001/api/users           | To Create a new user
| PUT           | http://localhost:3001/api/users/:id       | To Update a Single User with their `userId`
| DELETE        | http://localhost:3001/api/users/:id       | To Delete a single user from the DB

## Thoughts: 
| HTTP Method 	| Route                                   	| Description     
-------------   |------------------------------------------ |------------------
| GET           | http://localhost:3001/api/thoughts        | To `GET`All Thoughts
| GET           | http://localhost:3001/api/thoughts/:id    | To `GET` One thought by its `thoughtsId`
| POST          | http://localhost:3001/api/thoughts        | To Create a new Thought 
| PUT           | http://localhost:3001/api/thoughts/:id    | To Update a Thought bye its `thoughtsId`
| DELETE        | http://localhost:3001/api/thoughts/:id    | To Delete a Thought by its `thoughtsId`

## Friends:
| HTTP Method 	| Route                                   	                    | Description     
-------------   |-------------------------------------------------------------- |------------------
| POST          | http://localhost:3001/api/users/:id/friends/:friendId         | To add a friend by `userId` to `friendId`
| GET           | http://localhost:3001/api/users/:id/friends/:friendId         | To remove a friend `friendId` from a users `userId`

## Reactions: 
| HTTP Method 	| Route                                   	                             | Description     
-------------   |----------------------------------------------------------------------- |------------------
| POST          | http://localhost:3001/api/thoughts/:thoughtId/reactions                | Creates a reaction stored in a single thought's reaction array field 
| DELETE        | http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionsId   | Removes a reaction by the reaction's `reactionId` value. 

## License: 
This project is licensed under MIT

## Resources:
**ASK BCS** <br>

**MODULE 18** <br>

## Questions: 
Follow me on GitHub at [JayneValverde](https://github.com/JayneValverde) <br>
Contact me at Jaynevalverde@gmail.com <br>
Thank you!