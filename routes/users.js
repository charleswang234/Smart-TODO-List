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

  router.get("/register", (req, res) => {
    res.render("register");
  });
  
  return router;
}
