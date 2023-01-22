import asyncHandler from 'express-async-handler';
import Activity from '../models/activityModel.js';
// import cloudinary from '../config/cloudinary.js';

// @desc    Fetch all activities
// @route   GET /api/activities
// @access  Public
const getActivities = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {};

    const count = await Activity.countDocuments({ ...keyword });
    const activities = await Activity.find({ ...keyword });

    res.json({ activities });
})

// @desc    Fetch single activity
// @route   GET /api/activity/:id
// @access  Public
const getActivityById = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if (activity) {
        res.json(activity);
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
})

// @desc    Delete a activity
// @route   DELETE /api/activity/:id
// @access  Private/Admin
const deleteActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id)

    if (activity) {
        // const imagePath = activity.cloudinaryId;

        // try {
        //     await cloudinary.uploader.destroy(imagePath);
        // } catch (error) {
        //     console.error('there was an error:', error.message.data);
        // }

        await activity.remove();
        res.json({ message: 'Activity deleted' });
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }
})

// @desc    Create an activity
// @route   POST /api/activities
// @access  Private/Admin
const createActivity = asyncHandler(async (req, res) => {
    const {
        activityTitle,
        activityDescription
    } = req.body;

    const activity = new Activity({
        title: activityTitle,
        description: activityDescription,
        userId: req.user._id,
    })

    const createdActivity = await activity.save();
    res.status(201).json(createdActivity);
})

// @desc    Update an activity
// @route   PUT /api/activities/:id
// @access  Private/Admin
const updateActivity = asyncHandler(async (req, res) => {
    const {
        title,
        description
    } = req.body;

    const activity = await Activity.findById(req.body.id);

    if (activity) {
        activity.title = title
        activity.description = description

        const updatedActivity = await activity.save();
        res.json(updatedActivity);
    } else {
        res.status(404);
        throw new Error('Activity not found');
    }

})

export { getActivities, getActivityById, deleteActivity, createActivity, updateActivity }