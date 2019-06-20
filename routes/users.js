"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {
  
  function doesEmailExistinTable(email,cb) {
    let exists = false;
    knex
    .select("*")
    .from("users")
    .where({email: email})
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


  router.post("/", (req, res) => {
    doesEmailExistinTable(req.body.email, (user)=> {
      if (user){
        knex
        .select("*")
        .from("users")
        .where({email: req.body.email})
        .then((results) => {
          res.cookie('userID', results[0].uid)
          res.redirect("/");
      });
      } else {
        knex
          .insert({email:req.body.email, displayname:'req.body.password', displaypic:'https://vanillicon.com/v2/23463b99b62a72f26ed677cc556c44e8.svg'}, "uid")
          .into("users")
          .then((results) => {
            console.log(results);
            res.cookie('userID', results[0])
            res.redirect("/");
          });
      }
    });
    });

    router.post("/logout", (req, res) => {
      console.log('cookie');
      res.cookie('userID', "", -1);
      res.redirect("/");
    });
 

  return router;
}