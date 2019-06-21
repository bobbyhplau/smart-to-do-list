"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

    // router.get("/", (req, res) => {
    //   knex    
    //     .select("*")
    //     .from("todo")
    //     .then((results) => {
    //         res.json(results);
    //     });
    
    // });
    router.get("/", (req, res) => {
        console.log("USERID: ", req.cookie('userID', results[0]));
        knex
        .select("*")
          .from("todo")
          .where("userID")
          .where("movie")
          res.cookie('userID', results[0])
          res.redirect("/");

    });
    return router;
}