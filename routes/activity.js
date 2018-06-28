"use strict"
const express = require('express');
const router = express.Router();
module.exports = (knex) => {
  router.get("/", (req, res) => {
    // knex.select('*')
    // .from('tasks')
    // .then((results) => {
    //   res.json(results);
    // })
    if(req.session.user_id) {
     knex("tasks")
     .join("categories", "tasks.category_id", "=", "categories.id")
     .select("tasks.id", "tasks.user_id", "tasks.activity", "categories.category")
     .orderBy("tasks.id")
     .then((results) => {
      res.json(results);
    })
     .catch(function(error) {
      console.log(error);
    });
     return;
   }
   res.redirect("/login");
 }
 );
  return router;
}