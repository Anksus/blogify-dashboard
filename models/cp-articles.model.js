const mongoose = require("mongoose");
const marked = require("marked");
const createDompurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDompurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  topic: {
    type: String,
    trim: true,
  },
  subTopicName: {
    type: String,
    trim: true,
  },
  articleName: {
    type: String,
    unique: true,
    trim: true,
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
    this.sanitizeHTML = domPurify.sanitize(marked(this.markdown));
  }
  next();
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;
