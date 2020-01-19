const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title:String,
  url:String,
  description:String

})


//model accepts name:video , schema Name:videoSchema , collectionName:videoPlayerDatabase
module.exports = mongoose.model('Video' , videoSchema)