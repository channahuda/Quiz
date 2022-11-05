const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../model/user_model')
const { userSchema } = require("../helpers/validation_schema")
const { signAccessToken } = require('../helpers/jwt_helper')


module.exports = {
    register: async (req, res, next) => {
        console.log(req.body)
        try {
            const result = await userSchema.validateAsync(req.body)
            const doesExist = await User.findOne({ email: result.email })
            if (doesExist) {
                throw createError.Conflict(result.email + ' has already been registered')
            }
            const {
                email, password
            } = req.body;

            const user = new User({
                email, password
            })
            const savedUser = await user.save()
            const accessToken = await signAccessToken(savedUser.id)
            res.send('User Created Successfully')
        }
        catch (error) {
            //422 means client is sending something wrong
            if (error.isJoi === true) error.status = 422
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const result = await userSchema.validateAsync(req.body)
            const user = await User.findOne({ email: result.email })
            if (!user) throw createError.NotFound("User not registered")

            const isMatch = await (user.isValidPassword(result.password))
            if (!isMatch) throw createError.Unauthorized("Email/Password not valid")

            const accessToken = await signAccessToken(user.id)
            res.send({ accessToken })
        }
        catch (error) {
            if (error.isJoi === true) return next(createError.BadRequest("Invalid Username or Password"))
            next(error)
        }
    }
};