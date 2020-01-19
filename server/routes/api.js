const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/videos')

const db = "mongodb+srv://rakeshcr7:jinke7@videos-yvqob.mongodb.net/test?retryWrites=true&w=majority"
mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName: 'videos'
}, function (err) {
    if (err) {
        console.log("Error" + err)
    }
})

//just api response
router.get('/', (req, res) => {
    res.send("API WORKS")
})

router.get('/videos', function (req, res) {
    console.log("API WORKS")
    Video.find({})
        .exec(function (err, videos) {
            if (err) {
                console.log("error while fetching")
            }
            else {
                // console.log(videos)
                res.json(videos);
            }
        })
});

router.get('/videos/:id', function (req, res) {
    console.log("hiiii")
    Video.findById(req.params.id)
        .exec(function (err, video) {
            if (err) {
                // console.log("error while fetching")
                res.send("error while fetching");
            }
            else {
                // console.log(video)
                res.json(video);
            }
        })
})

router.post('/video', function (req, res) {
    var new_video = new Video();
    new_video.title = req.body.title;
    new_video.url = req.body.url;
    new_video.description = req.body.description;
    // console.log(new_video)
    const result = new_video.save((err, insertedVideo) => {
        if (err) {
            // console.log(err)
            res.send("Error Posting");
        } else {
            // console.log(insertedVideo)
            res.json(insertedVideo)
        }
    });
})

router.put('/video/:id', function (req, res) {
    // console.log("update ");
    Video.findByIdAndUpdate(req.params.id,
        {
            $set: { title: req.body.title, url: req.body.url, description: req.body.description }
        },
        {
            new: true
        },
        function (err, updatedVideo) {
            if (err) {
                res.send("error updating");
            } else {
                // console.log(updatedVideo)
                res.json(updatedVideo)
            }
        }
    )
});

router.delete('/video/:id', function (req, res) {
    // console.log('deleteing video');
    Video.findByIdAndRemove(req.params.id, function (err, deletedVideo) {
        if (err) {
            res.send("Delete Error", err);
        }
        else {
            // console.log(deletedVideo) 
            res.json(deletedVideo);
        }
    })
})

module.exports = router;