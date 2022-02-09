import asyncHandler from 'express-async-handler';
import Motivation from '../models/motivationModel.js';
import cloudinary from '../config/cloudinary.js';

// @desc    Fetch all motivations
// @route   GET /api/motivations
// @access  Public
const getMotivations = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await Motivation.countDocuments({ ...keyword });
    const motivations = await Motivation.find({ ...keyword });

    res.json({ motivations });
})

// @desc    Fetch single motivation
// @route   GET /api/motivation/:id
// @access  Public
const getMotivationById = asyncHandler(async (req, res) => {
    const motivation = await Motivation.findById(req.params.id)

    if (motivation) {
        res.json(motivation);
    } else {
        res.status(404);
        throw new Error('Motivation item not found');
    }
})

// @desc    Delete a motivation
// @route   DELETE /api/motivation/:id
// @access  Private/Admin
const deleteMotivation = asyncHandler(async (req, res) => {
    const motivation = await Motivation.findById(req.params.id)

    if (motivation) {
        await motivation.remove();
        res.json({ message: 'Motivation item deleted' });
    } else {
        res.status(404);
        throw new Error('Motivation item not found');
    }
})

// @desc    Create a motivation item
// @route   POST /api/motivations
// @access  Private/Admin
const createMotivation = asyncHandler(async (req, res) => {
    const {
        motivationAuthor,
        motivationQuote,
    } = req.body;

    const motivation = new Motivation({
        quote: motivationQuote,
        author: motivationAuthor,
        userId: req.user._id,
    })

    const createdMotivation = await motivation.save();
    res.status(201).json(createdMotivation);
})

// @desc    Update an motivation
// @route   PUT /api/motivations/:id
// @access  Private/Admin
const updateMotivation = asyncHandler(async (req, res) => {
    const {
        quote,
        author,
    } = req.body;

    const motivation = await Motivation.findById(req.body.id);

    if (motivation) {
        motivation.quote = quote
        motivation.author = author

        const updatedMotivation = await motivation.save();
        res.json(updatedMotivation);
    } else {
        res.status(404);
        throw new Error('Motivation item not found');
    }

})

export { getMotivations, getMotivationById, deleteMotivation, createMotivation, updateMotivation }