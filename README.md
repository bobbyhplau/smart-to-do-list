# to-do!
#### by Seth Marks, Carlo Javier, and Bobby Lau

## Overview

To-do is a full stack web application that provides users with a fully-functional taskmaster. The application groups tasks into four main categories: toWatch(movies/series), toEat(restaurants), toRead(books), and toBuy(products). Users are able to add new tasks using a singular input box. These tasks are then automatically sorted into its rightful category through an API-based algorithm. Users are able to delete a task upon completion, reorder entries based on priority-level, as well as update their profile in the profile page.

The project process involves a comprehensive undertaking of the many aspects of full stack web development. The back-end illustrates the understanding of JavaScript, jQuery, Ajax, modules, APIs, routing, and the innerworkings of HTTP. On the other hand, the front-end exhibits skills in tools such as HTML, CSS, SCSS, and Sass. This project also heavily involves the use of database management systems and includes the implementation of tools like PSQL and Knex.

## Node Skeleton

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Screenshots

!["Screenshot of login page"](https://github.com/bobbyhplau/smart-to-do-list/blob/master/screenshots/LoginPage.png?raw=true)
Be sure to login to use any feature of to-do
!["Screenshot of near-empty to-do list page"](https://github.com/bobbyhplau/smart-to-do-list/blob/master/screenshots/TodoPage_empty.png?raw=true)
Try and add an item to our to-do list. The algorithm will automatically sort your item into the correct list.
!["Screenshot of filled-up to-do list page"](https://github.com/bobbyhplau/smart-to-do-list/blob/master/screenshots/TodoPage_full.png?raw=true)
After you fill up your to-do list, you can edit, delete, or move your to-do item. When you've finished an item on your list, you can mark it complete.
!["Screenshot of change display name page"](https://github.com/bobbyhplau/smart-to-do-list/blob/master/screenshots/ChangeUserName.png?raw=true)
Checkout our user settings as well. Here you can change your display name and your display picture.

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body-parser
- Bootstrap
- Cookie-parser
- Cookie-session
- dotenv
- ejs
- express
- goodreads-api-node
- js-cookie
- Knex
- Knex-logger
- masonry-layout
- morgan
- node-sass-middleware
- omdb-client
- pg
- popper
- string-similarity
- tippy.js
- yelp-fusion
