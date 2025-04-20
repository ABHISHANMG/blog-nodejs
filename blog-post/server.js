const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 8000;
const registerApi = require('./routes/register')
const connectDB = require('./config/configDB');
const verifyJwt = require('./middleware/verifyJwt');

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/abhishan', (req, res) => {
    res.send('Missing you a little too much, a little too often, and a little more every day. 💖');
});

app.use('/', registerApi );
app.use(verifyJwt);
app.use('/', require('./routes/posts'));


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = app;