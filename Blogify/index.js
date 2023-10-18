// packages and modules imports
const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const cookieParser = require('cookie-parser')
const  {checkAuthCookie} = require('./middleware/auth')

//router and controllers imports
const connectDB = require('./config/connectDB')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')

//port
const PORT = process.env.PORT

//middlware to use facilities
app.use(express.static(path.resolve('./public')))

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.use(cookieParser())
app.use(checkAuthCookie('token'))
app.use('/users' ,userRoutes)
app.use('/blogs',blogRoutes)





connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening at port ${PORT}`)
    })
})
