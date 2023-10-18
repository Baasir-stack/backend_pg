const User = require('../models/userModel')


//@desc GET ALL USERS
//@route GET /api/users/ 
//@access public 

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({})

        if (!users) {
            res.status(404)
            throw new Error("There is no Users")
        }
        return res.status(200).json(users)
    } catch (err) {
        console.log(err)
    }

}

//@desc GET INDIVIDUAL USER
//@route GET /api/users/:id
//@access public 

const getUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id)

        if (!user) {
            res.status(404)
            throw new Error("Not Found")
        }
        return res.status(200).json(user)
    } catch (err) {
        res.status(500)
        throw new Error("Server Error")
    }
}

//@desc CREATE NEW USER
//@route POST /api/users/
//@access public 

const createUser = async (req, res) => {
    try {
        const user = req.body
        if (!user.first_name ||
            !user.last_name ||
            !user.email ||
            !user.gender ||
            !user.job_title
        ) {
            res.status(400)
            throw new Error("All fields must be filled")
        }

       const createdUser=  await User.create({
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            gender:user.gender,
            job_title:user.job_title
        })
        return res.status(201).json({createdUser})
    } catch (error) {
        res.status(500)
        throw new Error("Server Error")
    }
}


//@desc UPDATE USER
//@route PATCH /api/users/:id
//@access public 

const updateUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400)
            throw new Error("Please provide id")
        }
        const updatedUser =  await User.findByIdAndUpdate(
            req.params.id,
            req.body,
        )
        return res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500)
        throw new Error("Server Error")
    }
}


//@desc DELETE A USER
//@route DELETE /api/users/:id
//@access public 

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

         if (!user) {
            res.status(400)
            throw new Error("Please provide id")
        }
       const deletedUser = await User.findByIdAndDelete(req.params.id)
       if (!deletedUser) {
        res.status(400)
        throw new Error("Delete operation not completed")
    }
        return res.status(200).json(deletedUser)
    } catch (error) {
        res.status(500)
        throw new Error("Server Error")
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}