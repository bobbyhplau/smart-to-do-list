# PRESENTATION NOTES FOR MIDTERM PROJECT DEMO

## Introduction

- Introduce ourselves and our project: {to-do} => a taskmaster that allows a user to organize and track tasks they need or want to accomplish
- Tasks are divided into four main categories
    - toWatch (films/series)
    - toEat (restaurants)
    - toRead (books)
    - toBuy (products, etc.)

## Front-end

- Talk about the design
    - Delve into the aesthetics, colour scheme, and mood of the webpage.
        - We wanted a web that felt welcoming and we wanted an overall look that conveyed neutrality and might appeal to any user.
        - We experimented with different layouts and background patterns and felt that some earlier iterations of to-do geared towards either an explicitly more masculine look or an explicitly more feminine look and we wanted to find a balance.
        - We were keen on using colours that weren't too loud and striking. We opted for cooler tones that were easier on the eyes, especialyl should a user spend some time browsing through their task list
    - In an ideal scenario, we would like a user to be able to upload their image of choice as their display picture

## Back-end

- Talk about the functionalities
    - Our application operates through a mix of tools like JavaScript, jQuery, Ajax, Knex, and a smart API algorithm
    - We use APIs from OMDB, Yelp, and Goodreads to categorize three of the tasks, we then use a catch-all to define everything else as a "product"
    - Initially, our API system wouldn't recognize restaurants that had non-English titles, but now it's inclusive for all cuisines!
- Talk about sorting tasks if it comes through by demo
- Also talk about deleting tasks if the function comes through by demo
- Ideally, we would like to be able to animate a finished task by "crossing it off the list"
- Talk about the a user updating their username if it comes through by the demo

## Misc.

- Things we wish we could've added if we had more time
    - Dynamic links where a task would instantly become a hyperlink to its respective OMDB, Goodreads, Yelp, or Amazon page
    - More comprehensive API readings for movies and books not in English
