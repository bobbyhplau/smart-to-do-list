"use strict";

module.exports = function makeDataHelpers(knex) {
  return {

    addTask: function(newTask, cb) {
      knex("todos")
        .insert(newTask)
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        });
    },

    editTask: function(text, id, cb) {
      knex("todos")
        .where({ id: id })
        .update({ text: text })
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        })
    },

    deleteTask: function(id, cb) {
      knex("todos")
        .where({ id: id })
        .del()
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        })
    },

    editCategory: function(id, newCategory, cb) {
      knex("todos")
        .where({ id: id })
        .update({ category: newCategory })
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        })
    },

    complete: function(id, cb) {
      knex("todos")
        .where({ id: id })
        .update({ isComplete: true })
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        })
    },

    notcomplete: function(id, cb) {
      knex("todos")
        .where({ id: id })
        .update({ isComplete: false })
        .then((results) => {
          cb(null, results);
        }).catch((error) => {
          cb(error);
        })
    }


  }
};
