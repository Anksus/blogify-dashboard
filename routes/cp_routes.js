const express = require("express");
const router = express.Router();
const Article = require("../models/cp-articles.model");
const Topic = require("../models/cp-topics.model");

// NOTE: API TO CREATE TOPIC
router.route("/create-topic").post(async (req, res) => {
  const topic = new Topic({
    topic: req.body.topic,
  });
  try {
    await topic.save();
    res.redirect("/cp");
  } catch (error) {
    res.status(401).send(error);
  }
});

// NOTE: API TO CRAETE SUBTOPIC
router.post("/create-subtopic", async (req, res) => {
  try {
    await Topic.findOneAndUpdate(
      { topic: req.body.topic },
      {
        $push: {
          subTopic: { name: req.body.name },
        },
      }
    ).exec();
    res.redirect("/cp");
  } catch (error) {
    res.status(401).send(error);
  }

  res.send("done");
});

// NOTE: API TO FETCH ALL THE TOPICS
router.get("/create-subtopic", async (req, res) => {
  try {
    const topics = await Topic.find().select({ topic: -1 }).exec();
    res.render("cp/create-subtopic", { data: topics });
  } catch (error) {
    res.status(401).send(error);
  }
});

// NOTE: API TO GET DATA OF TOPICS AND SUBTOPICS AND RENDERING THEM OVER HTML
router.route("/").get(async (req, res) => {
  try {
    const allTopics = await Topic.find().exec();
    res.render("cp/cp_page", { data: allTopics });
  } catch (error) {
    res.status(400).send(error);
  }
});

// NOTE: API TO RENDER CREATE-TOPIC HTML
router.route("/create-topic").get((req, res) => {
  res.render("cp/create-topic");
});

// NOTE:// API TO RENDER CREATE-ARTICLE HTML WITH FETCHED TOPICS AND SUBTOPICS
router.route("/create-article").get(async (req, res) => {
  try {
    const topics = await Topic.find().select({ topic: -1 }).exec();
    res.render("cp/create-article", { data: topics });
  } catch (error) {
    res.status(400).send(error);
  }
});

// NOTE: API TO POST NEW ARTICLE TO DATABASE
router.route("/create-article").post(async (req, res) => {
  const newArticle = new Article({
    topic: req.body.topic,
    subTopicName: req.body.subTopicName,
    articleName: req.body.articleName,
    markdown: req.body.markdown,
  });
  try {
    await newArticle.save();
    res.send("done");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
