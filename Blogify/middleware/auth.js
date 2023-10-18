const { validateToken } = require("../service/auth")

const checkAuthCookie = (cookieName)=>{
    return (req, res, next)=>{
        //check if token is present in cookies
        const tokenCookieValue = req.cookies[cookieName]
     
        if(!tokenCookieValue){
            return next()
        }

        try {
            const payload = validateToken(tokenCookieValue)
            req.user = payload
            
        } catch (error) {
            return console.log(error)
        }
        return next()
    }
}

module.exports = {
    checkAuthCookie,
}