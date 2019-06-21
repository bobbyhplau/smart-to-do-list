"use strict";

const express = require('express');
const router = express.Router();


module.exports = (knex) => {

    const { addTask, updateTask, deleteTask } = require('./datahelpers.js')(knex);
    
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
      newTodo.category = "something";
      newTodo.userid ="6";
      addTask(newTodo, (err, results) => {
          console.log(err, results);
          if (err) {
            //   res.render('error', err);
            res.status(400).send('error:' + err);
          }else{
            res.status(201).json(results);
          }
      });
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
