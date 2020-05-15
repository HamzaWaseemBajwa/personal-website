const express = require('express');
const cors  = require('cors')
const mongoose = require('mongoose');

require('dotenv').config();
var admin_logged_in = false; 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const profileRouter = require("./routes/profile")
const loginRouter = require("./routes/login")
const adminRouter = require("./routes/admin")
const s3uploadRouter = require("./routes/s3upload")

app.use('/profile', profileRouter)
app.use('/login', loginRouter)
app.use('/admin', adminRouter)
app.use('/sign_s3', s3uploadRouter)

app.listen(port,()  => {
    console.log(`Running on 0.0.0.0:${port}`);
});
