const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"blog"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
},{ timestamps: true })

module.exports  = mongoose.model('comments',commentsSchema)





