const express = require("express");
const router = express.Router();
const Article = require("../models/cp-articles.model");

router.route("/create-topic").post(async (req, res) => {
  const val = req.body;
  console.log(val.article);
  const yo = new Article(val);
  console.log(yo);
  try {
    await yo.save();
    res.send("done");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.route("/create-topic").get(async (req, res) => {
  res.render("cp/_form_topic");
});

router.route("/").get(async (req, res) => {
  const all_data = await Article.find({});
  var lols = [];
  all_data.map((yo) => {
    lols.push(yo.article);
  });
  res.render("cp/cp_page", { lols: lols });
});

router.route("/add-article");

module.exports = router;
