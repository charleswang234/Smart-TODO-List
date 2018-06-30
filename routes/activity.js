"use strict"
const express = require('express');
const router = express.Router();
const categorize = require("../public/scripts/categorize.js")



function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}


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
     .join("users", "tasks.user_id", "=", "users.id")
     .where({"users.id": req.session.user_id})
     .select("tasks.id", "tasks.user_id", "tasks.activity", "categories.category")
     .orderBy("tasks.id")
     .then((results) => {
      // console.log(results);
      res.json(results);
    })
     .catch(function(error) {
      console.log(error);
    });
     return;
   }
  })


  router.post("/", function(req, res) {
  console.log("is it here?", req.body.inputActivity)
  console.log("session",req.session.user_id)
  // let activity = ('inputActivity').val();
  if (!req.body.inputActivity) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }
  else{
    let randomInt = categorize.checkQuery(req.body.inputActivity);
    console.log("inserting?")
    knex("tasks")
    .insert({'activity': req.body.inputActivity,
            'completed': false,
            'user_id': req.session.user_id,
            'category_id': randomInt
      })
    .then(function(){
      console.log("insert done")
      res.status(201).send();
      // res.redirect("/home")
    })
    }

  })

  // res.redirect("/login");

  return router;
}
