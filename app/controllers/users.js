const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
let UserModel = require('../models/users');

module.exports.getUser = async function (req, res, next) {
  try {
    let user = await UserModel.findOne({ _id: req.params.userId });

    res.json(user);

  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.create = async function (req, res, next) {
  try {
    let user = req.body;

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    let result = await UserModel.create(user);
    console.log(result);

    res.status(200);
    res.json(
      {
        success: true,
        message: "User created successfully."
      }
    );
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      res.status(400).json({
        success: false,
        message: "Duplicate key error: A user with this information already exists."
      });
    } else {
      console.log(error);
      next(error);
    }
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    let list = await UserModel.find();

    res.json(list);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    let updatedUser = UserModel(req.body);
    updatedUser._id = req.params.userId;
    let result = await UserModel.updateOne({ _id: req.params.userId }, updatedUser);
    console.log(result);

    if (result.modifiedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "User updated successfully."
        }
      );
    } else {
      throw new Error('User not updated. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.remove = async function (req, res, next) {
  try {
    let result = await UserModel.deleteOne({ _id: req.params.userId });
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "User deleted successfully."
        }
      );
    } else {
      throw new Error('User not deleted. Are you sure it exists?')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
}


module.exports.removeAll = async function (req, res, next) {
  try {
    let result = await UserModel.deleteMany();
    console.log(result);

    if (result.deletedCount > 0) {
      res.status(200);
      res.json(
        {
          success: true,
          message: "All users were deleted successfully."
        }
      );
    } else {
      throw new Error('Users were not deleted')
    }

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.signin = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. User not found."
      });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed. Incorrect password."
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, config.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};