"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  const { addTask, updateTask, deleteTask } = require('../lib/datahelpers.js')(knex);
  const categorize = require('../lib/smart-search.js').categorize;

  function checkForUser(userid, cb) {
    knex
      .select("*")
      .from("users")
      .where({
        id: userid
      })
      .then((results) => {
        cb(results[0]);
      }).catch(() => {
        cb(null);
      });
  }

  router.get("/", (req, res) => {
    const userid = req.cookies["userID"]
    const category = req.query.category;
    checkForUser(userid, (user) => {
      if (user) {
        knex
          .select("category", "text")
          .from("todos")
          .where({
            userid: user.id,
            category: category
          })
          .then((results) => {
            res.json(results);
          });
      } else {
        res.redirect("/")
      }
    })
  });

  router.post("/", (req, res) => {

    categorize(req.body.todo_text).then(
      function(category) {
        const newTodo = {
          userid: Number(req.cookies.userID),
          text: req.body.todo_text,
          category: category,
          isComplete: false,
          order: 0
        };

        addTask(newTodo, (err, results) => {
          console.log(err, results);
          if (err) {
            //   res.render('error', err);
            res.status(400).send('error:' + err);
          } else {
            res.status(201).send();
          }
        });
      })
  });

  //   router.put("/todo/:tid/:put", (req, res) => {
  //       knex.editTask(req.body.text, (err) => {
  //           if (err) {
  //               res.render('error', err);
  //           }
  //           res.redirect("/");
  //       });
  //   });

  //   router.post("/todo/:tid/:delete")




  return router;
}
