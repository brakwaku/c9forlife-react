import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Activity from '../models/activityModel.js';
import generateToken from '../utils/generateToken.js';
import sortObjects from '../utils/sortObjects.js';
import sendEmail from '../utils/sendEmails.js';
import jwt from 'jsonwebtoken';
import cloudinary from '../config/cloudinary.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).populate([
    'bucket.items.activityId',
    'toDoList.toDos.toDoId',
    'completed.comps.compId',
    'archive.archs.archId',
  ]);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      photoURL: user.photoURL,
      cloudinaryId: user.cloudinaryId,
      email: user.email,
      isAdmin: user.isAdmin,
      bucket: user.bucket.items,
      toDoList: user.toDoList.toDos,
      completed: user.completed.comps,
      archive: user.archive.archs,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, magicWord } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('This email already exists as a user');
  }

  //Logic to set roles
  let role;
  if (magicWord === 'madds') {
    role = true;
  } else {
    role = false;
  }

  const user = await User.create({
    firstName,
    lastName,
    name: firstName + ' ' + lastName,
    email,
    password,
    photoURL: 'sample',
    cloudinaryId: 'sample',
    isAdmin: role,
    bucket: { items: [] },
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      photoURL: user.photoURL,
      cloudinaryId: user.cloudinaryId,
      email: user.email,
      isAdmin: user.isAdmin,
      bucket: user.bucket,
      toDoList: user.toDoList,
      archive: user.archive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select('-password')
    .populate([
      'bucket.items.activityId',
      'toDoList.toDos.toDoId',
      'completed.comps.compId',
      'archive.archs.archId',
    ]);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      cloudinaryId: user.cloudinaryId,
      isAdmin: user.isAdmin,
      bucket: user.bucket.items,
      toDoList: user.toDoList.toDos,
      completed: user.completed.comps,
      archive: user.archive.archs,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    (user.name = req.body.firstName + ' ' + req.body.lastName),
      (user.email = req.body.email || user.email);
    user.photoURL = req.body.photoURL || user.photoURL;
    user.cloudinaryId = req.body.cloudinaryId || user.cloudinaryId;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      name: updatedUser.name,
      email: updatedUser.email,
      photoURL: updatedUser.photoURL,
      cloudinaryId: updatedUser.cloudinaryId,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const tempUsers = await User.find({}).populate([
    'bucket.items.activityId',
    'toDoList.toDos.toDoId',
    'completed.comps.compId',
    'archive.archs.archId',
  ]);
  const users = tempUsers.sort(sortObjects('name'));
  res.json(users);
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.email === req.user.email) {
      throw new Error('Operation impossible. You cannot delete this user');
    } else {
      try {
        await cloudinary.uploader.destroy(user.cloudinaryId);
      } catch (error) {
        console.error('there was an error:', error.message.data);
      }
      await user.remove();
      res.json({ message: 'User deleted' });
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select('-password')
    .populate([
      'bucket.items.activityId',
      'toDoList.toDos.toDoId',
      'completed.comps.compId',
      'archive.archs.archId',
    ]);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
      email: user.email,
      photoURL: user.photoURL,
      cloudinaryId: user.cloudinaryId,
      isAdmin: user.isAdmin,
      bucket: user.bucket.items,
      toDoList: user.toDoList.toDos,
      completed: user.completed.comps,
      archive: user.archive.archs,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Auth user & send email
// @route   GET /api/users/resetpassword
// @access  Public
const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const validateEmail = (theEmail) => {
    const re = /^\S+@\S+$/;
    return re.test(theEmail);
  };

  if (email === '' || !validateEmail(email)) {
    res.status(500);
    throw new Error('Please enter a valid email address');
  }

  const user = await User.findOne({ email });

  if (user) {
    const id = user._id;
    const mySecret = `${user.password}-${user.createdAt}`;

    const token = jwt.sign({ id }, mySecret, { expiresIn: '120s' });
    const decoded = jwt.verify(token, mySecret);

    // <p>Click this <a href="http://localhost:3000/reset/${decoded.id}/${token}">link</a> to set a new password</p>

    sendEmail({
      subject: 'C9ForLife account password reset',
      html: `
                <h3>Click <a href="https://c9forlife.herokuapp.com/reset/${decoded.id}/${token}"> this link</a> to set a new password</h3>
                <strong><h1>Please note that this link expires in less than 120 seconds</h1></strong>
            `,
      to: email,
      from: process.env.EMAIL,
    });

    res.status(200).json({
      message: `Reset link sent to ${email}`,
      token: token,
    });
  } else {
    res.status(404);
    throw new Error('Sorry!. No account with this email address found');
  }
});

// @desc    Auth user & reset password
// @route   PUT /api/users/reset/:id/:token
// @access  Private
const resetUserPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (user) {
    user.password = req.body.password;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found. Please try again');
  }
});

// @desc    Admin send email to user
// @route   POST /api/users/email
// @access  Private/Admin
const sendUserEmail = asyncHandler(async (req, res) => {
  const { email, subject, message } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    sendEmail({
      subject: `${subject}`,
      html: `
                <pre>${message}</pre>
            `,
      to: email,
      from: process.env.EMAIL,
    });

    res.status(200).json({ message: `Successfully sent email to ${email}` });
  } else {
    res.status(404);
    throw new Error(
      'Sorry!. An error occured. Email not sent. Please try again later'
    );
  }
});

// @desc    Auth user & add activity to user object
// @route   PUT /api/users/bucket/:activityId
// @access  Private
const addActivityToBucket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id).populate([
    'bucket.items.activityId',
    'toDoList.toDos.toDoId',
    'completed.comps.compId',
    'archive.archs.archId',
  ]);

  const activity = await Activity.findById(req.params.id);

  if (user && activity) {
    try {
      const updatedUser = await user.addToBucket(activity);

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.json({ message: error });
    }
  } else {
    res.status(404);
    throw new Error('Could not add activity. Please try again');
  }
});

// @desc    Auth user & remove activity from user object
// @route   DELETE /api/users/bucket/:activityId
// @access  Private
const removeActivityFromBucket = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  //   const activity = await Activity.findById(req.params.id);

  if (user) {
    const updatedUser = await user.removeFromBucket(req.params.id);

    res.json(updatedUser);
    // res.json({ message: "Activity deleted" });
  } else {
    res.status(404);
    throw new Error('Could not remove activity. Please try again');
  }
});

// @desc    Auth user & add activity to user object
// @route   PUT /api/users/bucket/:activityId
// @access  Private
const addActivityToTodo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  // const user = await User.findById(req.body._id).populate([
  //   "bucket.items.activityId",
  //   "toDoList.toDos.toDoId",
  //   "completed.comps.compId",
  //   "archive.archs.archId",
  // ]);

  const activity = await Activity.findById(req.params.id);

  if (user && activity) {
    // const updatedUser = await user
    //   .addToToDo(activity)
    //   .then((res) => res.removeFromBucket(activity._id));
    let updatedUser = await user.addToToDo(activity);
    updatedUser = await user.removeFromBucket(activity._id);

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('Could not add activity. Please try again');
  }
});

// @desc    Auth user & remove activity from user object
// @route   DELETE /api/users/todo/:activityId
// @access  Private
const removeActivityFromTodo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  //   const activity = await Activity.findById(req.params.id);

  if (user) {
    const updatedUser = await user.removeFromToDo(req.params.id);

    res.json(updatedUser);
    // res.json({ message: "Activity deleted" });
  } else {
    res.status(404);
    throw new Error('Could not remove activity. Please try again');
  }
});

// @desc    Auth user & add activity to user's completed activity'
// @route   POST /api/users/complete/:activityId
// @access  Private
const addActivityToCompleted = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);

  const activity = await Activity.findById(req.params.id);

  if (user && activity) {
    let updatedUser = await user.addToCompleted(activity._id);
    updatedUser = await user.removeFromToDo(activity._id);

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('Could not complete activity. Please try again');
  }
});

// @desc    Auth user & remove activity from user object
// @route   POST /api/users/archive/:activityId
// @access  Private
const removeActivityFromCompleted = asyncHandler(async (req, res) => {
  const user = await User.findById(req.body._id);
  const activity = await Activity.findById(req.params.id);

  if (user && activity) {
    let updatedUser = await user.addToArchive(activity._id);
    updatedUser = await user.removeFromCompleted(activity._id);

    res.json(updatedUser);
    // res.json({ message: "Activity deleted" });
  } else {
    res.status(404);
    throw new Error('Could not archive activity. Please try again');
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  getUserByEmail,
  sendUserEmail,
  resetUserPassword,
  addActivityToBucket,
  removeActivityFromBucket,
  addActivityToTodo,
  removeActivityFromTodo,
  addActivityToCompleted,
  removeActivityFromCompleted,
};
