require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routers');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  // useFindAndModify: false
})
.then(() => {
  console.log('MongoDB database connection established successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error.message);
});

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
