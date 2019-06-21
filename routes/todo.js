"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

  function checkForUser(userid, cb) {
    knex
      .select("*")
      .from("users")
      .where({
        uid: userid
      })
      .then((results) => {
        cb(results[0]);
      }).catch(() => {
        cb(null);
      });
  }

  router.get("/", (req, res) => {
    const userid = req.cookies["userID"]
    checkForUser(userid, (user) => {
      if (user) {
        knex
          .select("category", "text")
          .from("todo")
          .where({
            userid: user.uid
          })
          .then((results) => {
            res.json(results);
          });
      } else {
          res.redirect("/")
      }
    })
  });
  return router;
}
