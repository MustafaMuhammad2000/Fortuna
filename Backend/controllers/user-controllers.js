const HttpError = require('../models/http-error');
const User = require('../models/user_schema');

const signup = async (req, res, next) => {
    const { name , password } = req.body;
  
    let existingUser
    try {
      existingUser = await User.findOne({ name: name })
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again later.',
        500
      );
      return next(error);
    }
    
    if (existingUser) {
      const error = new HttpError(
        'User exists already, please login instead.',
        422
      );
      return next(error);
    }
    
    const createdUser = new User({
      name,
      password,
      transactions: []
    });
  
    try {
      await createdUser.save();
    } catch (err) {
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
  
    res.status(201).json({user: createdUser.toObject({ getters: true })});
  };

  const login = async (req, res, next) => {
    const { name, password } = req.body;
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ name: name })
    } catch (err) {
      const error = new HttpError(
        'Logging in failed, please try again later.',
        500
      );
      return next(error);
    }
  
    if (!existingUser || existingUser.password !== password) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    res.json({message: 'Logged in!'});
  };

  exports.signup = signup;
  exports.login = login;