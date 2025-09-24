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
router.get('/:boardid', async (req, res) => {
    try {
        const notes = await prisma.notes.findMany({
            where: { board_id: parseInt(req.params.boardid, 10) }
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
        const note = await prisma.notes.create({
            data: {
                content: req.body.content,
                x_loc: req.body.x_loc,
                y_loc: req.body.y_loc,
                board_id: parseInt(req.params.id)
            },
        });
        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error creating note" });
    }

})

router.patch('/:id', async (req, res) => {
    try {
        const updatedNote = await prisma.notes.update({
            where: { id: parseInt(req.params.id) },
            data: {
                content: req.body.content,
                x_loc: req.body.x_loc,
                y_loc: req.body.y_loc,
            },
        });
        res.json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error updating note" });
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const deletedNote = await prisma.notes.delete({
            where: { id: parseInt(req.params.id) },
        });
        res.json(deletedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error deleting note" });
    }

})

module.exports = router