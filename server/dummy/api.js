const express = require('express')
//const router = express.Router()
const router = express()

const mongoose = require('mongoose')
const Video = require('../models/video')
const db = "mongodb+srv://new_user:Shweta12@cluster0-m5vgc.mongodb.net/test?retryWrites=true&w=majority"
mongoose.promise = global.Promise


//connect accepts url and dbName:videoPlayer
mongoose.connect(db,{dbName:'videoPlayer'},{useNewUrlParser:true})




router.get('/videoPlayerDatabase',function(req,res){
  console.log("hiiii")
  Video.find({})
  .exec(function(err, videoPlayer){
    if(err){
      console.log("error while fetching")
    }
    else{
      console.log(videoPlayer)
      res.json(videoPlayer);
    }
  })

});

router.get('/videoPlayer/:id',function(req,res){
  console.log("hiiii")
  Video.findById(req.params.id)
  .exec(function(err, videoPlayer){
    if(err){
      console.log("error while fetching")
    }
    else{
      console.log(videoPlayer)
      res.json(videoPlayer);
    }
  })
})


// not working this post method require some changes

router.post('/videoPlayerDatabase',function(req,res){
    console.log("post video")

    var new_video = new Video();
    new_video.title = req.body.title;
    new_video.url = req.body.url;
    new_video.description = req.body.description;
    console.log(new_video)
    const result = new_video.save();
    console.log(result)

  })





router.put('/video/:id',function(req,res){
  console.log("update ");
  Video.findByIdAndUpdate(req.params.id,
    {
      $set: {title:req.body.title, url:req.body.url , description: req.body.description}
    },
      {
        new:true
      },

      function(err,updatedVideo){
        if(err){
          res.send("error updating");
        }else{
          console.log(updatedVideo)
          res.json(updatedVideo)
        }
      }
    )
});


//even delete is not working require some changes

router.delete('/video/:id',function(req,res){
  console.log('deleteing video');
  Video.findByIdAndRemove(req.params.id , function(err,deletedVideo){
    if(err){
      res.send("eror");

    }
    else{
      res.json(deletedVideo)
    }
  })
})

module.exports = router
