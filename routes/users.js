"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/home", (req, res) => {
    res.render("index");                    // modify later to redirect to /home/:id if logged in and
                                            //  redirects to login page  if not logged in
    // knex
    //   .select("*")
    //   .from("users")
    //   .then((results) => {
    //     res.json(results);
    // });
  });

  // home page that allows logged in users to add and remove their items on the to do list
  router.get("/home/:id", (req, res) => {
    res.render("index");
  });

  // router.post("/home/:id", (req, res) => {
  //   if (!req.body.text) {
  //     res.status(400).json({ error: 'invalid request: no data in POST body'});
  //     return;
  //   }

  // });


  router.get("/", (req, res) => {
    res.render("login");            // modify later to render a the home page if logged in
  });


  // login page
  router.get("/login", (req, res) => {
    res.render("login");
  });

  // registration page
  router.get("/register", (req, res) => {
    res.render("register");
  });

  return router;
}
