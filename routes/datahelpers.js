"use strict";

module.exports = function makeDataHelpers(knex) {
  return {

    addTask: function(newTask, cb) {
      knex("todos")
        .insert({text: newTask.text, category: newTask.category})
        .then((results) => {
        cb(null, results);
        }).catch((error) => {
          cb(error);
        });
    },

    editTask: function(newTask, cb) {
      knex("todos")
        .where({id: newTask.id})
        .update({text: newTask.text, category: newTask.category})
        .then((results) => {
            cb(null, results);
        }).catch((error) => {
            cb(error);
        })
    },

    deleteTask: function(id, cb) {
        knex("todos")
          .where({id: id})
          .del()
          .then((results) => {
              cb(null, results);
          }).catch((error) => {
              cb(error);
          })
    },

    // editCategory: function(newCategory, cb) {
    //     knex("todos")
    //       .where({id: newCategory.id})
    //       .update({category: newCategory.category})
    //       .then((results) => {
    //         cb(null, results);
    //       }).catch((error) => {
    //         cb(error);
    //       })
    // }
    // }
  };