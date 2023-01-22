import path from 'path';
import express from 'express';
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
const router = express.Router();

const storage = multer.diskStorage({
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb('only .jpg, .jpeg or .png images allowed!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
})

router.post('/', upload.single('image'), asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId);

    if(user) {
        try {
            const result = await cloudinary.uploader.upload(req.file.path, {
                upload_preset: 'store_uploads',
            })
    
            if (req.body.oldId != 'sample') {
                await cloudinary.uploader.destroy(req.body.oldId)
            }

            user.photoURL = result.secure_url;
            user.cloudinaryId = result.public_id;
            await user.save();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
        }
    } else {
        res.status(404);
        throw new Error("There was an error uploading the image");
    }
}));

router.post('/delete', async (req, res) => {
    const user = await User.findById(req.body.userId);
    if(user) {
        try {
            const result = await cloudinary.uploader.destroy(req.body.id)

            user.photoURL = 'sample';
            user.cloudinaryId = 'sample';
            await user.save();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
        }
    }
})

export default router