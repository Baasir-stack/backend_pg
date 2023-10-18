const mongoose = require('mongoose')

const { createHmac, randomBytes } = require('crypto')
const { create } = require('domain')
const { parseArgs } = require('util')
const { generateToken } = require('../service/auth')
const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    profileImageURL: {
        type: String,
        default: '/images/default.png'
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default:"USER"
    }

}, { timestamps: true })

userSchema.pre("save", function (next) {
    const user = this

    if (!user.isModified()) return

    const salt = randomBytes(16).toString()

    const hashedPassword = createHmac('sha256', salt)
    .update(user.password)
    .digest('hex')

    this.salt = salt
    this.password = hashedPassword

   return  next()
})



// static signin / login  method 

userSchema.statics.signin = async function(email,password){


    if(!email || !password){
        throw Error("All fields must be filled")
    }
    

    const users = await this.findOne({email})

    if(!users){
        throw Error("User not found!")
    }
    
    const salt = users.salt
    const hashedPassword = users.password

    const userProvidedHash = createHmac('sha256',salt)
    .update(password)
    .digest('hex')



    if(hashedPassword !== userProvidedHash){
        throw new Error("Incorrect password")

    }
    const token = await generateToken(users)


    
    
    return token
}



module.exports = mongoose.model('User', userSchema)

