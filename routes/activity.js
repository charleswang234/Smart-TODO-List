"use strict"

const express = require('express');
const request = require('request');
const router = express.Router();
const categorize = require("../public/scripts/categorize.js");

module.exports = (knex) => {

  // allow user to change the category of their task
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
          res.status(201).send();
        })
      }
    })
  }

  router.get("/", (req, res) => {
    if(req.session.user_id) {
     knex("tasks")
     .join("categories", "tasks.category_id", "=", "categories.id")
     .join("users", "tasks.user_id", "=", "users.id")
     .where({"users.id": req.session.user_id})
     .select("tasks.id", "tasks.user_id", "tasks.activity", "categories.category", "tasks.completed")
     .orderBy("tasks.id")
     .then((results) => {
      res.json(results);
    })
     .catch(function(error) {
      console.log(error);
    });
     return;
   }
 })

  router.post("/", function(req, res) {
    if (!req.body.inputActivity) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    else {
      let catID = categorize.checkQuery(req.body.inputActivity)
      if (catID){
        knex("tasks")
        .insert({'activity': req.body.inputActivity,
          'completed': false,
          'user_id': req.session.user_id,
          'category_id': catID
        })
        .then(function(){
          res.status(201).send();
          return;
        })} else {

    //have a promise that allow testing before the data is added
    let getNumber = new Promise (function(resolve, reject){
      var test2 = '';
      function getCategory(categorys) {
        var url = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ categorys+'&output=json'
        request(url, function (err, result, body){
          var data = JSON.parse(body);
          var test = data.query[0].domain;
          test2 = test;
        })
      }
      getCategory(req.body.inputActivity);
      setTimeout(function() {
        resolve(test2);
      }, 500);
    })

    //promise fulfilled
    getNumber.then((success) => {
      console.log(success,'in post')
      let number = null
      if (success === 'movies') {
        number = 3;
      }
      else if (success === 'food'){
        number = 4;
      }
      else if (success === 'books' || success === 'a fictional character'){
        number = 2;
      }
      else {
        number = null;
      }
      return number;

    }).then((categoryID) => {
      if (!categoryID){
       knex("tasks")
       .insert({'activity': req.body.inputActivity,
        'completed': false,
        'user_id': req.session.user_id,
        'category_id': 1
      })
       .then(function(){
        res.status(201).send();
        return;
      })

     } else {
      knex("tasks")
      .insert({'activity': req.body.inputActivity,
        'completed': false,
        'user_id': req.session.user_id,
        'category_id': categoryID
      })
      .then(function(){
        res.status(201).send();
        return;
      })
    }
  })
  }
}
});

  // delete a task
  router.post("/delete", function(req, res) {
    knex('tasks')
    .where({"user_id": req.session.user_id})
    .andWhere({"activity": req.body.task})
    .del()
    .then(function () {
      res.status(201).send();
    })
  });

  // complete a task
  router.post("/completed", function(req, res) {
    console.log(req.body);
    knex('tasks')
    .where({"user_id": req.session.user_id})
    .andWhere({"activity": req.body.task})
    .update({completed: true})
    .then(function () {
      res.status(201).send();
    })
  });

  // change section to the eat section
  router.post("/toeat", function(req, res) {
    changeTask(4, req, res);
  });

  // change section to the read section
  router.post("/toread", function(req, res) {
    changeTask(2, req, res);
  });


  // change section to the buy section
  router.post("/tobuy", function(req, res) {
    changeTask(1, req, res);
  });

  // change section to the watch section
  router.post("/towatch", function(req, res) {
    changeTask(3, req, res);
  });

  return router;
}