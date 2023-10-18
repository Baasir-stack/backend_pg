const jwt  = require('jsonwebtoken')

const generateToken =  async(user)=>{

    const payload = {
        _id:user.id,
        name:user.fullName,
        email:user.email,
        profileImageURL:user.profileImageURL,
        role:user.role,
    }

    const token  = await jwt.sign(payload,process.env.SECRET)

    return token
}


const validateToken = (token)=>{
      const payload = jwt.verify(token, process.env.SECRET)
      
      return payload
}

module.exports = {
    generateToken,
    validateToken
}