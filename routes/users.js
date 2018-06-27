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

   // sends you to the edit page
   router.get("/home/:id/edit", (req, res) => {
      res.render("edit");
   });

  // home page that allows logged in users to add and remove their items on the to do list
  router.get("/home/:id", (req, res) => {
    res.render("index");
  });

  router.post("/home/:id", (req, res) => {
    if (!req.body.task_entry) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    res.redirect('/home/:id');  // change
  });


  router.get("/", (req, res) => {
    res.render("login");            // modify later to render a the home page if logged in
  });


  // login page
  router.get("/login", (req, res) => {
    res.render("login");
  });

  // logging in
  router.post("/login", (req, res) => {
    res.redirect("/home/:id");
  });

  // registration page
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", (req, res) => {
    res.redirect("/home/:id");
  });

  // user clicks the logout submit
  router.post("/logout", (req, res) => {
    res.redirect("/login");
  });

  return router;
}
