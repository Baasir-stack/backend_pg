const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()


//controllers
const { getAddBlog,
  createBlog,
  getIndividualBlog,
  commentsHandler } = require('../controllers/blogController')

//multer setup to accept files as input
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'))
  },
  filename: function (req, file, cb) {
    console.log(file)
    const fileName = `${Date.now()} - ${file.originalname}`
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })



router.get('/add-new', getAddBlog)

router.post('/', upload.single('cover-image'), createBlog)

router.use(express.static(path.resolve('./public')))
router.get('/:id', getIndividualBlog)


//blogId is: kis blog par comment hua
router.post('/comments/:blogId', commentsHandler)



module.exports = router
