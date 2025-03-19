const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyparser = require('body-parser');

dotenv.config()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))

//database import
const connectDB = require('./models/db');
connectDB()
const routes = require('./routes/index')

const port = process.env.PORT || 3002

//routes
app.use('/api',routes)

app.get('/',(req,res,next)=>{
    res.send("project is running");
})
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(port,()=>{
    console.log(`your server is running on port ${port}`)
})

