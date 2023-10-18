//file , packages etc import
const express = require('express')
const app = express()
const users = require('./MOCK_DATA.json')
const fs = require('fs')
const PORT = 4000
const userRoutes = require("./Routes/userRoutes")
const connectDB = require('./Config/connectDB')
require('dotenv').config()
const errorHandler = require('./Middleware/errorHandler')


//DATABASE CONNECTION

//MIDDLWARE
app.use(express.json())

//ROUTES

app.use('/api/users',userRoutes)

// // GET - HTML DOCUMENT
// app.get('/users', (req, res) => {
//     const html = `
//     <ul>
//         ${users.map(user => `<li>${user.first_name}</li>`).join("")}
//     </ul>
//     `
//     res.send(html);
// })



app.use(errorHandler)

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
