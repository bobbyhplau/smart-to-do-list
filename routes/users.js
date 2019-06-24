"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

  // function for editing displayname, works on postman, but not quite on the page
  function editDisplayName(displayname, newDisplayName, cb) {
    knex("users")
      .where({ displayname: displayname })
      .update({ displayname: newDisplayName })
      .then((results) => {
        return cb(null, results);
      }).catch((error) => {
        return cb(error, null);
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

  // route for changing displayname, something is not working about this
  //
  /*  router.post("/profile", (req, res) => {
      console.log(req.body.displayname, req.body.newDisplayName)
      editDisplayName(req.body.displayname, req.body.newDisplayName, (err, results) => {
        if (err) {
          res.status(400).send('error:' + err);
          return;
        } else {
          res.status(201).json(results);
          return;
        }
      })

      res.render("profile");
    })*/

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
            res.cookie('displayname', results[0].displayname);
            res.cookie('displaypic', results[0].displaypic);
            res.redirect("/");
          });
      } else {
        knex
          .insert({
            email: req.body.email,
            displayname: "New User",
            displaypic: 'https://vanillicon.com/v2/23463b99b62a72f26ed677cc556c44e8.svg'
          }, ["id", "displayname", "displaypic"])
          .into("users")
          .then((results) => {
            res.cookie('userID', results[0].id)
            res.cookie('displayname', results[0].displayname);
            res.cookie('displaypic', results[0].displaypic);
            res.redirect("/");
          });
      }
    });
  });

  router.post("/logout", (req, res) => {
    res.cookie('userID', "", -1);
    res.cookie('displayname', "", -1);
    res.cookie('displaypic', "", -1);
    res.status(204).send();
  });

  router.put("/:uid/newDisplayName/:newDisplayName", (req, res) => {
    knex("users")
      .where({ id: req.params.uid })
      .update({ displayname: req.params.newDisplayName }, "displayname")
      .then((results) => {
        res.cookie('displayname', results[0]);
        res.status(202).send();
      });
  });

  router.put("/:uid/newDisplayPic/:newDisplayPic", (req, res) => {
    knex("users")
      .where({ id: req.params.uid })
      .update({ displaypic: req.params.newDisplayPic }, "displaypic")
      .then((results) => {
        res.cookie('displaypic', results[0]);
        res.status(202).send();
      });
  });


  return router;
}
