const Blog = require('../models/blogModel')
const Comment = require('../models/commentsModel')

//@desc ADD BLOG PAGE
//@route GET /blogs/add-new
const getAddBlog = async (req, res) => {
    return res.render('addBlog', {
        user: req.user,
    })
}

//@desc CREATE BLOG
//@route POST /blogs/

const createBlog = (req, res) => {
    

    const { title, body } = req.body

    const blog = Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `uploads/${req.file.filename}`
    })
    return res.redirect(`/users`)

}

//@desc GET INDIVIDUAL BLOG
//@route GET /blogs/:id


const getIndividualBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('createdBy')
        const comments = await Comment.find({blogId:req.params.id}).populate('createdBy')
        console.log(comments)
        
        console.log('blogs are',blog.createdBy.fullName)

        return res.render('blog', {
            user: req.user,
            blog,
            comments,
        })
    } catch (error) {
        return res.status(400).json({ error })
    }
}



//@desc COMMENT ON A BLOG
//@route POST /blogs/:blogId

const commentsHandler = async (req, res)=>{

    try {
        
        const comments = await Comment.create({
            content:req.body.content,
            blogId:req.params.blogId,
            createdBy:req.user._id,
        })
        return res.redirect(`/blogs/${req.params.blogId}`)
    } catch (error) {
        return res.status(400).json({error})
    }

}





module.exports = { getAddBlog, createBlog, getIndividualBlog,commentsHandler }