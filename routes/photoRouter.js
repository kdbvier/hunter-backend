// // server/routes/photos.js

const express = require('express');
const router = express.Router();
const PhotoController = require('../controllers/photoController');
const User = require('../models/User');
const Photo  = require('../models/Photo');
// const { generateRSS } = require('../middleware/generateRSSMiddleware');

const multer = require("multer");
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = `uploads/${req.headers.userid}`;
    mkdirp(uploadDir, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, uploadDir);
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });



router.post('/upload', upload.array('files'), async(req, res) => {
    const files = req.files;
  try {
    for (let i = 0; i < files.length; i++) {
      const newphoto = new Photo({
        filename: files[i].filename,
        userID: req.headers.userid // assuming you have authentication middleware that sets req.user
      });
      await newphoto.save();
    }
    res.send("Files uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

  
router.get('/photos', async(req, res) => {
    const photos = await Photo.find();
    console.log(photos)
    res.send(photos);
  });


// Upload a photo
// router.post('/upload', generateRSS, PhotoController.uploadPhoto);

module.exports = router;
