import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/createToken.js";

/**
 * @route   POST /api/users
 * @desc    Create a new user
 * @access  Public
 * @param   {String} name - The name of the user (required)
 * @param   {String} email - The email of the user (required)
 * @param   {String} password - The password for the user (required)
 * @returns {Object} - A JSON object containing the newly created user data
 * @throws  {400} If the name, email, or password is missing or invalid
 * @throws  {409} If the email is already in use
 * @throws  {500} If a server error occurs
 */
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, contact } = req.body;

  // Check the body has necessary attributes
  if (!name || !email || !password || !contact) {
    throw new Error("Please fill all the inputs!!!");
  }

  // Check the user if already exist
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).send("User already exists!!!");
    return;
  }

  // Encrypting the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating a user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    contact,
  });

  try {
    await newUser.save();
    generateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      contact: newUser.contact,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @route   POST /api/users/auth
 * @desc    Authenticate user and get token
 * @access  Public
 * @param   {String} email - The email of the user (required)
 * @param   {String} password - The password of the user (required)
 * @returns {Object} - A JSON object containing the user data and the authentication token
 * @throws  {400} If the email or password is missing or invalid
 * @throws  {401} If the email or password is incorrect
 * @throws  {500} If a server error occurs
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exist
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    // Generate token if the user is valid
    if (isPasswordValid) {
      const token = generateToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        contact: existingUser.contact,
        isAdmin: existingUser.isAdmin,
        token: token,
      });
      return; // Exit the method after sending the response
    }
  }

  res.status(401).send("Invalid email or password");
});

/**
 * @route   POST /api/users/logout
 * @desc    Log out the current user
 * @access  Private
 * @header  {String} Authorization - The bearer token of the user (required)
 * @returns {Object} - A JSON object with a message confirming the logout
 * @throws  {401} If the user is not authenticated
 * @throws  {500} If a server error occurs
 */
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully!" });
});

/**
 * @route   GET /api/users
 * @desc    Retrieve a list of all users
 * @access  Private
 * @header  {String} Authorization - The bearer token of the user (required)
 * @returns {Array} - A JSON array containing user objects
 * @throws  {401} If the user is not authenticated
 * @throws  {500} If a server error occurs
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

/**
 * @route   GET /api/users/profile
 * @desc    Retrieve the current user's profile
 * @access  Private
 * @header  {String} Authorization - The bearer token of the user (required)
 * @returns {Object} - A JSON object containing the user's profile data
 * @throws  {401} If the user is not authenticated
 * @throws  {500} If a server error occurs
 */
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      contact: user.contact,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update the current user's profile
 * @access  Private
 * @header  {String} Authorization - The bearer token of the user (required)
 * @body    {Object} profileData - The updated profile data
 * @returns {Object} - A JSON object containing the updated user's profile data
 * @throws  {400} If the profile data is invalid
 * @throws  {401} If the user is not authenticated
 * @throws  {500} If a server error occurs
 */
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contact = req.body.contact || user.contact;
    user.isAdmin = Boolean(req.body.isAdmin);

    let passwordChanged = false;

    if (req.body.password) {
      // Encrypting the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      user.password = hashedPassword;
      passwordChanged = true;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contact: updatedUser.contact,
      isAdmin: updatedUser.isAdmin,
      message: passwordChanged
        ? "Password successfully changed!"
        : "Profile updated successfully!",
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete a user by ID
 * @access  Private
 * @header  {String} Authorization - The bearer token of the admin user (required)
 * @param   {String} id - The ID of the user to delete
 * @returns {Object} - A JSON object confirming deletion
 * @throws  {401} If the user is not authenticated
 * @throws  {403} If the user does not have permission to delete
 * @throws  {404} If the user is not found
 * @throws  {500} If a server error occurs
 */
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user!");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed!" });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/**
 * @route   GET /api/admin/users/:id
 * @desc    Retrieve a user by ID (Admin only)
 * @access  Private
 * @header  {String} Authorization - The bearer token of the admin user (required)
 * @param   {String} id - The ID of the user to retrieve
 * @returns {Object} - A JSON object containing the user's profile data
 * @throws  {401} If the user is not authenticated
 * @throws  {403} If the user is not an admin
 * @throws  {404} If the user is not found
 * @throws  {500} If a server error occurs
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

/**
 * @route   PUT /api/users/:id
 * @desc    Update a user by ID (Admin only)
 * @access  Private
 * @header  {String} Authorization - The bearer token of the admin user (required)
 * @param   {String} id - The ID of the user to update
 * @body    {Object} userData - The updated user data
 * @returns {Object} - A JSON object containing the updated user's profile data
 * @throws  {400} If the user data is invalid
 * @throws  {401} If the user is not authenticated
 * @throws  {403} If the user is not an admin
 * @throws  {404} If the user is not found
 * @throws  {500} If a server error occurs
 */
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.dateofbirth = req.body.dateofbirth || user.dateofbirth;
    // user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      dateofbirth: updatedUser.dateofbirth,
      // isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
