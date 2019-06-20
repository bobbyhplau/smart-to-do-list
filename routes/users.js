"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.post("/users", (req, res) => {
    if (err) {
      return response.render('error', err)
    }


  })

  

  return router;
}
