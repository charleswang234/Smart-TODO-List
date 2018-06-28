"use strict"

const express = require('express');
const router = express.Router();

module.exports = (knex) => {
  router.get("/", (req, res) => {
    if(req.session.user_id) {
     knex
     .select("*")
     .from("categories")
     .then((results) => {
      res.json(results);
    })
     .catch(function(error) {
      console.log(error);
    });
     return;
   }
 });
  return router;
}