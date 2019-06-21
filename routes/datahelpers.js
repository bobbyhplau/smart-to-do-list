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
        .update({text: newTask.text, category: newTask.category})
        .then((results) => {
            cb(null, results);
        }).catch((error) => {
            cb(error);
        })
    },

    deleteTask: function(newTask, cb) {
        knex("todo")
          .delete({text: newTask.text, category: newTask.category})
          .then((results) => {
              cb(null, results);
          }).catch((error) => {
              cb(error);
          })
    },
    }
  };

