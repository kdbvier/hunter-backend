// const { google } = require('googleapis');
// const fs = require('fs');
// const path = require('path');
// const multer = require('multer');
// const upload = multer();
// const dotenv=require('dotenv');
// dotenv.config()

// // Set up Google Authentication
// const auth = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI
// );

// // Initialize the Google Photos API client
// const photos = google.photoslibrary({
//   version: 'v1',
//   auth: auth,
// });

// // Route to handle photo uploads
// exports.uploadPhoto = (req, res) => {
//   // Get the uploaded file from the request body
//   const file = req.file;
  
//   // Read the file data into a buffer
//   const photoData = fs.readFileSync(file.path);
  
//   // Upload the photo to Google Photos
//   photos.mediaItems.create({
//     requestBody: {
//       albumId: ALBUM_ID,
//       mediaItem: {
//         fileName: file.originalname,
//         mimeType: file.mimetype,
//         description: 'Photo uploaded from my website',
//         simpleMediaItem: {
//           fileName: file.originalname,
//           uploadToken: Buffer.from(photoData).toString('base64'),
//         },
//       },
//     },
//   })
//   .then((response) => {
//     // Delete the uploaded file from disk
//     fs.unlinkSync(file.path);

//     // Return the newly created media item ID to the client
//     res.json({ success: true, mediaItemId: response.data.id });
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to upload photo' });
//   });
// };
