"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  const { addTask, editTask, deleteTask, editCategory, complete, notcomplete } = require('../lib/datahelpers.js')(knex);
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

  router.get("/notfinished", (req, res) => {
    const userid = req.cookies["userID"]
    const category = req.query.category;
    checkForUser(userid, (user) => {
      if (user) {
        knex
          .select("category", "text", "id")
          .from("todos")
          .where({
            userid: user.id,
            category: category,
            isComplete: false
          })
          .then((results) => {
            res.json(results);
          });
      } else {
        res.redirect("/")
      }
    });
  });

  router.get("/finished", (req, res) => {
    const userid = req.cookies["userID"]
    const category = req.query.category;
    checkForUser(userid, (user) => {
      if (user) {
        knex
          .select("category", "text", "id")
          .from("todos")
          .where({
            userid: user.id,
            category: category,
            isComplete: true
          })
          .then((results) => {
            res.json(results);
          });
      } else {
        res.redirect("/")
      }
    });
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
            res.status(400).send('error:' + err);
          } else {
            res.status(201).send();
          }
        });
      })
  });

  router.put("/:id/toCategory/:category", (req, res) => {
    editCategory(req.params.id, req.params.category, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    });
  });

  router.put("/:id/complete", (req, res) => {
    complete(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    });
  });

  router.put("/:id/notcomplete", (req, res) => {
    notcomplete(req.params.id, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    });
  });

  router.put("/:id/changeTodo/:newtodo", (req, res) => {
    const text = req.params.newtodo;
    const id = req.params.id;
    editTask(text, id, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    });
  });

  router.delete("/:id", (req, res) => {
    let tid = Number(req.params.id);
    deleteTask(tid, (err, results) => {
      if (err) {
        res.status(400).send('error:' + err);
      } else {
        res.status(201).json(results);
      }
    });
  });


  return router;

};
