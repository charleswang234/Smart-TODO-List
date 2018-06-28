"use strict";

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs')

module.exports = (knex) => {

 router.get("/", (req, res) => {
  if(req.session.user_id) {
    res.redirect("/home");
    return;
  }
  res.redirect("/login");
});


// home page that allows logged in users to add and remove their items on the to do list
router.get("/home", (req, res) => {
  if(req.session.user_id) {

    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
    res.render("index")
    return;
  }
  res.redirect("/login");
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

// adding a new item to to-do list
router.post("/home", (req, res) => {
  if (!req.body.task_entry) {
    res.status(400).json({ error: 'invalid request: no data in POST body'});
    return;
  }
  res.redirect('/home');
});

   // renders the edit page
   router.get("/home/edit", (req, res) => {
    if(req.session.user_id) {
      res.render("edit");
      return;
    }
    res.redirect("/login");
  });





  // login page
  router.get("/login", (req, res) => {
    if(req.session.user_id) {
      res.redirect("/home");
      return;
    }
    res.render("login");
  });


  // logging in
  router.post("/login", (req, res) => {

    knex('users')
    .where({ email: req.body.email } )
    .select('*')
    .then(function(result){
      console.log(result)
      if (result.length === 0 ){
        res.status(400).json({ error: 'Invalid email or password.'});
        return;
      }

      if (bcrypt.compareSync(req.body.password, result[0].password)) {
        //create cookie session
        req.session.user_id = result[0].id
        res.redirect("/home");
        return;
      }

      res.status(400).json({ error: 'Invalid email or password.'});
      return;

      })
    .catch(function(error) {
      console.log(error);
    })
  });

  // registration page
  router.get("/register", (req, res) => {
    if(req.session.user_id) {
      res.redirect("/home");
      return;
    }
    res.render("register");
  });

  // hashing function
  const hashing = (password) =>{
    return bcrypt.hashSync(password, 10)
  }


  // submitting a registration
  router.post("/register", (req, res) => {
    knex('users')
    .select('*')
    .where({ email: req.body.email })
    .then( function(result){

      if (result.length === 0 ){

        knex('users')
        .insert({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hashing(req.body.password),
          email: req.body.email
        })
        .returning('id')
        .then(function(id)
        {
          req.session.user_id = id[0];
          res.redirect("/home");
          console.log(id[0]);

        })
        .catch(function(error) {
          console.log(error);
        })

        return;
      }
        //error email already exists
        res.status(400).json({ error: 'Invalid request: email already exists.'})
        console.log("error! email exists")
        return;
      })
  });

  // user clicks the logout submit
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });

  //make sure front end event checks for empty entry for forms

  return router;
}
