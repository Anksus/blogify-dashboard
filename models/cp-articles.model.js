const mongoose = require("mongoose");
const marked = require("marked");
const createDompurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDompurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  topic: {
    type: String,
    unique: true,
  },
  subTopicName: {
    type: String,
    unique: true,
  },
  articleName: {
    type: String,
    unique: true,
  },
  markdown: {
    type: String,
    unique: true,
  },
  sanitizeHTML: {
    type: String,
  },
});

articleSchema.pre("validate", function (next) {
  if (this.topic[0].docs[0].markdown) {
    // console.log(this.topic.docs.markdown);
    // console.log("-------------");
    this.topic[0].docs[0].sanitizeHTML = domPurify.sanitize(
      marked(this.topic[0].docs[0].markdown)
    );
  }
  next();
});
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
