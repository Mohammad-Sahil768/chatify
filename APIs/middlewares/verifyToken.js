const jwt = require('jsonwebtoken')
//const dotenv = require('dotenv').config()

const verifyToken = (request, response, next) => {

    const bearerToken = request.body.token
    
    if(bearerToken == undefined){
        response.send({message: 'Unauthorized Access..\nPlz Login first..'})
    }else{
        try{
            jwt.verify(bearerToken, "abcdef")
            next()
        }catch(err){
            next(new Error('Session Expired. Plz Login Again..'))
        }
    }
}

module.exports = verifyToken