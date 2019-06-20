"use strict";

const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');

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
    knex
      .select("email")
      .from("users")
  })

 

  return router;
}
