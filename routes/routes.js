const express = require("express");

const router = express.Router();

module.exports = () => {
  router.get("/example", (req, res) => {
    if (!req.session.login) {
      res.redirect("/login");
    } else {
      console.dir(req.session);
      return res.render("example", {
        title: "My EJS Example",
        firstname: "Hello EJS Template",
        surname: "My Heading Two"
      });
    }
  });
  router.get("/login", (req, res) => {
    return res.render("login");
  });

  router.post("/login", (req, res) => {
    // console.dir(req.body);
    let username = req.body.username;
    let password = req.body.password;
    // basic example you could be calling your database here to check the credentials
    if (username === "admin" && password === "letmein") {
      req.session.login = true;
      res.redirect("/example");
    } else {
      res.redirect("/login");
    }
    // count example
  });

  router.get("/logout", (req, res) => {
    req.session.destroy(function(err) {
      res.redirect("/login");
    });
  });

  return router;
};
