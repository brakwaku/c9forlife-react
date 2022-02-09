import asyncHandler from 'express-async-handler';
import ActivitySuggestion from '../models/activitySuggestionModel.js';
import Activity from '../models/activityModel.js';

// @desc    Fetch all suggestions
// @route   GET /api/suggestions
// @access  Public
const getActivitySuggestions = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await ActivitySuggestion.countDocuments({ ...keyword });
    const activitySuggestions = await ActivitySuggestion.find({ ...keyword });

    res.json({ activitySuggestions });
})

// @desc    Fetch single activity
// @route   GET /api/activity/:id
// @access  Public
const getActivitySuggestionById = asyncHandler(async (req, res) => {
    const activitySuggestion = await ActivitySuggestion.findById(req.params.id)

    if (activitySuggestion) {
        res.json(activitySuggestion);
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
})

// @desc    Delete a activity
// @route   DELETE /api/activity/:id
// @access  Private/Admin
const deleteActivitySuggestion = asyncHandler(async (req, res) => {
    const activitySuggestion = await ActivitySuggestion.findById(req.params.id)

    if (activitySuggestion) {
        // const imagePath = activity.cloudinaryId;

        // try {
        //     await cloudinary.uploader.destroy(imagePath);
        // } catch (error) {
        //     console.error('there was an error:', error.message.data);
        // }

        await activitySuggestion.remove();
        res.json({ message: 'Activity deleted' });
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
})

// @desc    Create an activity
// @route   POST /api/activities
// @access  Private/Admin
const createActivitySuggestion = asyncHandler(async (req, res) => {
    const {
        activitySuggestionTitle,
        activitySuggestionDescription
    } = req.body;

    const activitySuggestion = new ActivitySuggestion({
        title: activitySuggestionTitle,
        description: activitySuggestionDescription,
        userId: req.user._id,
    })

    const createdActivitySuggestion = await activitySuggestion.save();
    res.status(201).json(createdActivitySuggestion);
})

// @desc    Update a suggestion
// @route   PUT /api/activitySuggestions/:id
// @access  Private/Admin
const updateActivitySuggestion = asyncHandler(async (req, res) => {
    const {
        title,
        description
    } = req.body;

    const activitySuggestion = await ActivitySuggestion.findById(req.body.id);

    if (activitySuggestion) {
        activitySuggestion.title = title
        activitySuggestion.description = description

        const updatedActivitySuggestion = await activitySuggestion.save();
        res.json(updatedActivitySuggestion);
    } else {
        res.status(404);
        throw new Error('Suggestion not found');
    }

})

// @desc    Approve a suggestion
// @route   POST /api/activitySuggestions/:id
// @access  Private/Admin
const approveActivitySuggestion = asyncHandler(async (req, res) => {
    const activitySuggestion = await ActivitySuggestion.findById(req.params.id);

    if (activitySuggestion) {
        const approvedSuggestion = new Activity({
            title: activitySuggestion.title,
            description: activitySuggestion.description,
            userId: req.user._id,
            suggestedBy: activitySuggestion.userId
        })
    
        const createdActivity = await approvedSuggestion.save();
        await activitySuggestion.remove();
        
        res.status(201).json(createdActivity);
    } else {
        res.status(404);
        throw new Error('Suggestion not found');
    }

})

export { getActivitySuggestions, getActivitySuggestionById, deleteActivitySuggestion, createActivitySuggestion, updateActivitySuggestion, approveActivitySuggestion }