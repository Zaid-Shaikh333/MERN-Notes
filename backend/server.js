const express = require("express")
const env = require("dotenv").config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const colors = require('colors')
const port = process.env.PORT || 5000
const app = express()
const cors = require('cors')
/*
app.use(cors())
app.use((req, res, next) => {  
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.setHeader(  
        "Access-Control-Allow-Headers",  
        "Origin, X-Requested-With, Content-Type, Accept"); 
    res.setHeader("Access-Control-Allow-Methods",  
        "GET, POST, PATCH, DELETE, OPTIONS");  
    next();  
}); */
app.use(cors({
    origin: '*'
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/tasks', require('./routes/TasksAPI'))
app.use('/api/users', require('./routes/UsersAPI'))


app.use(errorHandler)
app.listen(port,() => console.log(`Listening to Port ${port}`))

connectDB()