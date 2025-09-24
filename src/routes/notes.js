const express = require('express')
const { PrismaClient } = require('@prisma/client')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const authorize = require('../middleware/authorize');
require('dotenv').config()

const router = express.Router()
const prisma = new PrismaClient()

//laddar in i en board
//får alla notes som hör till den med id
router.get('/:id', async (req, res) => {
    try {
        const notes = await prisma.notes.findMany({
            where: { board_id: parseInt(req.params.id, 10) }
        })
        res.json(notes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Error fetching notes" })
    }

})

//create new post
//body
router.post('/:id', async (req, res) => {
    try {
        const newNotes = await prisma.notes.create({
            data: {
                content: req.body.text,
                x_loc: req.body.x_loc,
                y_loc: req.body.y_loc,
                board_id: req.params.id
            }
        })
        res.json({newNotes})

    } catch (error) {
        res.status(500).send({ msg: "Error", error })
    }

})
module.exports = router