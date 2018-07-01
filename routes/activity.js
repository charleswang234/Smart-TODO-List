"use strict"
const express = require('express');
const router = express.Router();
const categorize = require("../public/scripts/categorize.js")



function randomInteger(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}



module.exports = (knex) => {
  function changeTask(category, req, res) {
    knex('tasks')
    .where({"user_id": req.session.user_id})
    .andWhere({"activity":req.body.task})
    .select("*")
    .then(function(activity) {
      if (activity[0].category_id === category) {
        console.log('no change');
        res.status(201).send();
        return;
      } else {
        knex('tasks')
        .where({"user_id": req.session.user_id})
        .andWhere({"activity":req.body.task})
        .update({"category_id": category})
        .then(function(activity) {
          console.log('changed');
          res.status(201).send();
        })
      }
    })
  }



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
     .select("tasks.id", "tasks.user_id", "tasks.activity", "categories.category", "tasks.completed")
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

});


  // delete a task (url is /activity/delete)
  router.post("/delete", function(req, res) {
    // console.log(req.body.task);
    knex('tasks')
    .where({"user_id": req.session.user_id})
    .andWhere({"activity": req.body.task})
    .del()
    .then(function () {
      console.log("delete done");
      res.status(201).send();
    })
  });


  router.post("/completed", function(req, res) {
    console.log(req.body);
    knex('tasks')
    .where({"user_id": req.session.user_id})
    .andWhere({"activity": req.body.task})
    .update({completed: true})
    .then(function () {
      console.log("completed");
      res.status(201).send();
    })
  });
  // res.redirect("/login");


  // change section to the eat section
  router.post("/toeat", function(req, res) {
    console.log(req.body);
    changeTask(4, req, res);
  });

  // change section to the read section
  router.post("/toread", function(req, res) {
    console.log(req.body);
    changeTask(2, req, res);
  });


  // change section to the buy section
  router.post("/tobuy", function(req, res) {
    console.log(req.body);
    changeTask(1, req, res);
  });

  // change section to the watch section
  router.post("/towatch", function(req, res) {
    console.log(req.body);
    changeTask(3, req, res);
  });

  return router;
}
