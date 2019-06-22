"use strict";

module.exports = function makeDataHelpers(knex) {
  return {

    addTask: function(newTask, cb) {
      knex("todo")
        .insert({text: newTask.text, category: newTask.category})
        .then((results) => {
        cb(null, results);
        }).catch((error) => {
          cb(error);
        });
    },

    editTask: function(newTask, cb) {
      knex("todo")
        .where({tid: newTask.id})
        .update({text: newTask.text, category: newTask.category})
        .then((results) => {
            cb(null, results);
        }).catch((error) => {
            cb(error);
        })
    },

    deleteTask: function(id, cb) {
        knex("todo")
          .where({tid: id})
          .del()
          .then((results) => {
              cb(null, results);
          }).catch((error) => {
              cb(error);
          })
    },
    }
  };