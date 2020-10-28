const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subTopic: [
    {
      name: {
        type: String,
        trim: true,
      },
    },
  ],
});

const Topic = mongoose.model("Topic", topicSchema);
module.exports = Topic;
