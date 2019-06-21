"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

    const { addTask, editTask, deleteTask } = require('./datahelpers.js')(knex);
    
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
    const category = req.query.category;
    checkForUser(userid, (user) => {
      if (user) {
        knex
          .select("category", "text")
          .from("todo")
          .where({
            userid: user.uid,
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
      const newTodo = req.body;
      addTask(newTodo, (err, results) => {
          if (err) {
            res.status(400).send('error:' + err);
          }else{
            res.status(201).json(results);
          }
      });
  });

  router.put("/:id", (req, res) => {
      const editTodo = req.body;
      editTodo.id = req.params.id;
      editTask(editTodo, (err, results) => {
          if (err) {
            res.status(400).send('error:' + err);
          }else{ 
            res.status(201).json(results);
          }
      });
  });

  router.post("/todo/:tid/:delete", (req, res) => {
      deleteTask(req.body.text, (err, results) => {
          if (err) {
              res.status(400).send('error:' + err);
          }else{
              res.status(201).json(results);
          }
      });
  });



  
  return router;
}
