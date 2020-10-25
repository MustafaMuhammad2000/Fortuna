const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user_schema');

const signup = async (req, res, next) => {
    const { name , password , monthlylimit} = req.body;
  
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
    
    let hashedPassword;
    try{
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err){
      const error = new HttpError('Could not create user, please try again.', 500);
      return next(error);
    }
    const createdUser = new User({
      name,
      password: hashedPassword,
      monthlylimit,
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

    let token;
    try {
    token = jwt.sign(
      {userId: createdUser.id},
       'big_secret_do_not_share', //Got to change this when deploying
       { expiresIn: '1h'}
       );
    } catch (err){
      const error = new HttpError(
        'Signing up failed, please try again.',
        500
      );
      return next(error);
    }
    res.status(201).json({message: "Sign up was successful", userId: createdUser.id, token: token, monthlylimit: monthlylimit, name:name});
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
  
    if (!existingUser) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }
  
    let isValidPassword = false;
    try{
      isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch(err) {
      const error = new HttpError('Could not log you in, please check your credentials and try again', 500);
      return next(error);
    }
      
    if (!isValidPassword) {
      const error = new HttpError(
        'Invalid credentials, could not log you in.',
        401
      );
      return next(error);
    }

    let token;
    try {
    token = jwt.sign(
      {userId: existingUser.id},
       'big_secret_do_not_share', //Got to change this when deploying
       { expiresIn: '1h'}
       );
    } catch (err){
      const error = new HttpError(
        'Logging in failed, please try again.',
        500
      );
      return next(error);
    }
    res.json({message: 'Logged in!', userId: existingUser.id, token: token, monthlylimit: existingUser.monthlylimit, name: existingUser.name});
  };

  exports.signup = signup;
  exports.login = login;