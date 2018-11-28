const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
//we did not create a model because because this is not a diffrent doc