const express = require("express");
const router = express.Router();
const Article = require("../models/cp-articles.model");
const Topic = require("../models/cp-topics.model");

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

router.post("/create-subtopic", async (req, res) => {
  try {
    await Topic.findOneAndUpdate(
      { topic: req.body.topic },
      {
        $push: {
          subTopic: { name: req.body.name },
        },
      }
    );
    res.redirect("/cp");
  } catch (error) {
    res.status(401).send(error);
  }

  res.send("done");
});

router.get("/create-subtopic", async (req, res) => {
  try {
    const topics = await Topic.find().select({ topic: -1 }).exec();
    res.render("cp/create-subtopic", { data: topics });
  } catch (error) {
    res.status(401).send(error);
  }

  res.send("done");
});

// For frontend api route
router.get("/all-topics", async (req, res) => {});

// router.route("/create-topic").get(async (req, res) => {
//   res.render("cp/_form_topic");
// });

router.route("/").get(async (req, res) => {
  try {
    const allTopics = await Topic.find();
    res.render("cp/cp_page", { data: allTopics });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/create-topic").get((req, res) => {
  res.render("cp/create-topic");
});

router.route("/create-article").get(async (req, res) => {
  try {
    const topics = await Topic.find().select({ topic: -1 });
    res.render("cp/create-article", { data: topics });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.route("/create-article").post((req, res) => {});
// router.route("/add-article");

module.exports = router;
