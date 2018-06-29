"use strict"
const express = require('express');
const router = express.Router();
module.exports = (knex) => {
  router.post("/", function(req, res) {



    res.redirect("/home")
  });

  return router;
}