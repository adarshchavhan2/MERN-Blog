
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const env = require('dotenv').config();
const port = process.env.PORT || 5000;
const { error } = require('./middlewares/error');
const { connectDb } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const path = require('path');

connectDb();

// middlewares
app.use(cookieParser());
app.use(express.json({
  limit: '100MB'
}))


// available routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

//static files
app.use(express.static(path.join(__dirname, "./client/dist")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

// error hanlder
app.use(error);

app.listen(port, ()=> {
    console.log('🚀app running..')
})
