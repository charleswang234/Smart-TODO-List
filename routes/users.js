"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/home/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/home/:id", (req, res) => {
    res.render("index");
  });

  // router.post("/home/:id", (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body'});
  //     return;
  //   }

  // });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", (req, res) => {
    knex('users')
      .where({ email: req.body.email })
      .select('password')
      .then(function(result){
        if (!result || !result[0]) {
          //render error message
          return;
        }
        if (result[0].password === req.body.password){
          //allow login (create cookie session)
          //redirect to page
        } else {
          //failed login and render error message
        }
      })
      .catch(function(error) {
        console.log(error);
      })

  });


  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", (req, res) => {
    //make sure front end event checks for empty entry for forms

    knex('users')
    .select('*')
    .where({ email: req.body.email })
    .then( function(result){
      if (result[0].email === req.body.email ){
        //error email already exists
        res.status(400).json({ error: 'Invalid request: email already exists.'})
        console.log("error! email exists")
        return;
      }
      if (!result || !result[0].email ){

        knex('users')
          .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: req.body.password,
          email: req.body.email
          })
          .catch(function(error) {
            console.log(error);
          })
        //create cookie session
        //res.redirect("/home")

      }
    })

});

  return router;
}
