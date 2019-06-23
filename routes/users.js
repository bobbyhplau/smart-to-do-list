"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

  function editDisplayName(id, newDisplayName, cb) {
    knex("users")
      .where({id: id})
      .update({displayname: newDisplayName})
      .then((results) => {
        cb(null, results);
      }).catch((error) => {
        cb(error);
      });
        
  }

  function doesEmailExistinTable(email, cb) {
    knex
      .select("*")
      .from("users")
      .where({
        email: email
      })
      .then((results) => {
        cb(results[0]);
      }).catch(() => {
        cb(null);
      });
  }

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  // router.get("/error", (req, res) => {
  //   res.render("error");
  // });

  router.get("/profile", (req, res) => {
    res.render("profile");
  })

  router.put("/profile", (req, res) => {
    editDisplayName(req.body.id, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    })

    res.render("profile");
  })

  router.post("/", (req, res) => {
    doesEmailExistinTable(req.body.email, (user) => {
      if (user) {
        knex
          .select("*")
          .from("users")
          .where({
            email: req.body.email
          })
          .then((results) => {
            res.cookie('userID', results[0].id)
            res.redirect("/");
          });
      } else {
        knex
          .insert({
            email: req.body.email,
            displayname: 'req.body.password',
            displaypic: 'https://vanillicon.com/v2/23463b99b62a72f26ed677cc556c44e8.svg'
          }, "id")
          .into("users")
          .then((results) => {
            res.cookie('userID', results[0])
            res.redirect("/");
          });
      }
    });
  });

  router.post("/logout", (req, res) => {
    res.cookie('userID', "", -1);
    res.status(204).send();
  });


  return router;
}
