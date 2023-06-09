const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');



// Load environment variables from .env file
dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error(err);
});



// Create Express app
const app = express();
app.use(cors());
// Enable CORS

// Parse JSON request bodies
app.use(express.json());

// Route handlers
const authRouter = require('./routes/authRouter');
const photoRouter = require('./routes/photoRouter');
app.use('/api/auth', authRouter);
app.use('/api', photoRouter);

app.get('/public/image/:uid/:filename', async(req, res) => {
  const filePath = path.join(__dirname, `uploads/${req.params.uid}/${req.params.filename}`); // replace with the file you want to send
  res.sendFile(filePath);
});
app.get('/test', async(req, res)=>{
  res.send('ok')
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});