const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const books = require('../model/books_model')


module.exports = {
    // getBooks: async (req, res, next) => {
    //     books.find({})
    //         .exec((error, Books) => {
    //             if (error) return res.status(400).json({ error });
    //             if (Books) {
    //                 res.status(200).json({ books });
    //             }
    //         })
    // }
    getBooks: async (req, res, next) => {

        try {
            const list = await books.find();
            res.send({ books: list })
        } catch (error) {
            res.status(200).json(
                { books }
            );
        }
    },

    searchTitle: async(req, res, next) => {
        
    }
}