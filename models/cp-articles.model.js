const mongoose = require("mongoose");
const marked = require("marked");
const createDompurify = require("dompurify");
const { JSDOM } = require("jsdom");
const domPurify = createDompurify(new JSDOM().window);

const articleSchema = new mongoose.Schema({
  article: {
    type: String,
    unique: true,
  },
  topic: [
    {
      topicName: {
        type: String,
        unique: true,
      },
      docs: [
        {
          docName: {
            type: String,
            unique: true,
          },
          markdown: {
            type: String,
          },
          sanitizeHTML: {
            type: String,
          },
        },
      ],
    },
  ],
});

articleSchema.pre("validate", function (next) {
  // console.log(this.topic.docs.markdown);
  console.log("-------------");

  console.log(this.topic[0].docs[0].markdown);
  console.log("-------------");

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
