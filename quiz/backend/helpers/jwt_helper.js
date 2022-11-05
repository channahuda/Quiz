const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const User = require('../model/user_model')

module.exports = {
    signAccessToken: (userid) => {
        return new Promise((resolve, reject) => {
            const payload = {
            }
            const secret = process.env.ACCESS_TOKEN_SECRET
            const options = {
                expiresIn: '2hr',
                audience: userid
            }

            jwt.sign(payload, secret, options, (err, token) => {
                if (err) {
                    console.log(err.message)
                    reject(createError.InternalServerError())
                }
                resolve(token)
            })
        })
    },

    verifyAccessToken: async (req, res, next) => {
        if (!req.headers['authorization'])
            return next(createError.Unauthorized());
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message =
                    err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return next(createError.Unauthorized(message))
            }
            req.payload = payload
            next()
        })
    }
}