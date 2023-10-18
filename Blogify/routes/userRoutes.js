const express = require('express')
const Blog  = require('../models/blogModel')


const router = express.Router()


//controllers
const { signupUser, signinUser,logout } = require('../controllers/userController')

router.get('/', async(req,res)=>{

    const allBlogs = await Blog.find({})

    return  res.render("home",{
         user:req.user,
         blogs:allBlogs,
     })
 })



router.get('/signup', (req, res) => {
    return res.render('signup')
})
router.get('/signin', (req, res) => {
    return res.render('signin')
})

router.get('/logout', logout)



router.post('/signup', signupUser)

router.post('/signin', signinUser)



//login route
// router.post('/login',loginUser)


// //signup route
// router.post('/signup',signupUser)

module.exports = router
