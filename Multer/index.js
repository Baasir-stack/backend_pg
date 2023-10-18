const express = require('express')
const app = express()
require('dotenv').config()
const path = require('path')

const PORT = 4000


app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));



app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
})