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
  if (this.markdown) {
    console.log(this.markdown);
    this.sanitizeHTML = domPurify.sanitize(marked(this.markdown));
    console.log(this.sanitizeHTML);
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
