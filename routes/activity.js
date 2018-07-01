"use strict"
const express = require('express');
const request = require('request');
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
    let catID = categorize.checkQuery(req.body.inputActivity)
    if (catID){
      knex("tasks")
      .insert({'activity': req.body.inputActivity,
        'completed': false,
        'user_id': req.session.user_id,
        'category_id': catID
      })
      .then(function(){
        console.log("insert done")
        res.status(201).send();
        return;
        // res.redirect("/home")
      })} else {




    //have a promise that allow testing before the data is added
    let getNumber = new Promise (function(resolve, reject){
      var test2 = '';
      function getCategory(categorys) {
        var url = 'http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=DEMO&mode=Default&i='+ categorys+'&output=json'
        request(url, function (err, result, body){
          var data = JSON.parse(body);
          var test = data.query[0].domain;
          console.log(test);
          test2 = test;
        })
      }
      getCategory(req.body.inputActivity);
      setTimeout(function() {
        resolve(test2);
      }, 2000);
    })

    //promise fulfilled
    getNumber.then((success) => {
      console.log(success,'in post')
      let number = null
      if (success == 'movies') {
        console.log("is the movie?")
        number = 3;
      }
      else if (success == 'food'){
        console.log("is this a food?")
        number = 4;
      }
      else if (success == 'books'){
        console.log("is this a book?")
        number = 2;
      }
      else {
        console.log('trigger event')
        number = null;
      }
      console.log('category ID is: ', number)
      return number;

    }).then( (categoryID) => {
      if (!categoryID){
       knex("tasks")
       .insert({'activity': req.body.inputActivity,
        'completed': false,
        'user_id': req.session.user_id,
        'category_id': 1
      })
       .then(function(){
        console.log("insert done")
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
        console.log("insert done")
        res.status(201).send();
        return;
      })
    }

  } )
  }
}

});

  // res.redirect("/login");

  return router;

}

      // if ("resolves") {

      //   Promise.race( )
      //   resolve("we add the data");
      // } else {
      //   reject("run event choosing category")
      // }

    //   getNumber.then(function(fromResolve){
      // knex("tasks")
      // .insert({'activity': req.body.inputActivity,
      //   'completed': false,
      //   'user_id': req.session.user_id,
      //   'category_id': randomInt
      // })
      // .then(function(){
      //   console.log("insert done")
      //   res.status(201).send();
      //   // res.redirect("/home")
      // })



    // let randomInt = categorize.checkQuery(req.body.inputActivity);




